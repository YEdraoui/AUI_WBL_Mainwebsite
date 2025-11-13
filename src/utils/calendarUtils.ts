import { Event } from "@/hooks/useEvents";
import { format, parseISO } from "date-fns";

// Generate ICS (iCalendar) format for calendar export
export const generateICS = (events: Event[]): string => {
  const icsEvents = events.map(event => {
    const startDate = parseISO(event.start_datetime);
    const endDate = parseISO(event.end_datetime);
    const deadlineDate = event.application_deadline ? parseISO(event.application_deadline) : null;
    
    // Format dates for ICS (YYYYMMDDTHHMMSSZ format)
    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const eventICS = `BEGIN:VEVENT
UID:${event.id}@aui-events.com
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${event.event_name} (${event.program})
DESCRIPTION:${event.description || ''}${event.location ? `\\nLocation: ${event.location}` : ''}${event.apply_now_link ? `\\nApply: ${event.apply_now_link}` : ''}
${event.location ? `LOCATION:${event.location}` : ''}
STATUS:CONFIRMED
END:VEVENT`;

    // Add application deadline as separate event if exists
    const deadlineICS = deadlineDate ? `
BEGIN:VEVENT
UID:${event.id}-deadline@aui-events.com
DTSTART:${formatICSDate(deadlineDate)}
DTEND:${formatICSDate(new Date(deadlineDate.getTime() + 60 * 60 * 1000))}
SUMMARY:Application Deadline: ${event.event_name}
DESCRIPTION:Application deadline for ${event.event_name} (${event.program})${event.apply_now_link ? `\\nApply: ${event.apply_now_link}` : ''}
STATUS:CONFIRMED
END:VEVENT` : '';

    return eventICS + deadlineICS;
  }).join('\n');

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AUI Career Programs//Events Calendar//EN
CALNAME:AUI Career Programs Events
X-WR-CALNAME:AUI Career Programs Events
X-WR-CALDESC:Events and deadlines for Co-op, Remote@AUI, and Alternance programs
${icsEvents}
END:VCALENDAR`;
};

// Download ICS file
export const downloadICS = (events: Event[], filename: string = 'aui-events.ics') => {
  const icsContent = generateICS(events);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generate Google Calendar URL for single event
export const generateGoogleCalendarURL = (event: Event): string => {
  const startDate = parseISO(event.start_datetime);
  const endDate = parseISO(event.end_datetime);
  
  const formatGoogleDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.event_name} (${event.program})`,
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
    details: `${event.description || ''}${event.apply_now_link ? `\n\nApply: ${event.apply_now_link}` : ''}`,
    location: event.location || '',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Generate Outlook Calendar URL for single event
export const generateOutlookCalendarURL = (event: Event): string => {
  const startDate = parseISO(event.start_datetime);
  const endDate = parseISO(event.end_datetime);
  
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: `${event.event_name} (${event.program})`,
    startdt: startDate.toISOString(),
    enddt: endDate.toISOString(),
    body: `${event.description || ''}${event.apply_now_link ? `\n\nApply: ${event.apply_now_link}` : ''}`,
    location: event.location || '',
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

// Generate Yahoo Calendar URL for single event
export const generateYahooCalendarURL = (event: Event): string => {
  const startDate = parseISO(event.start_datetime);
  const endDate = parseISO(event.end_datetime);
  
  const formatYahooDate = (date: Date) => {
    return format(date, "yyyyMMdd'T'HHmmss'Z'");
  };

  const params = new URLSearchParams({
    v: '60',
    title: `${event.event_name} (${event.program})`,
    st: formatYahooDate(startDate),
    et: formatYahooDate(endDate),
    desc: `${event.description || ''}${event.apply_now_link ? `\n\nApply: ${event.apply_now_link}` : ''}`,
    in_loc: event.location || '',
  });

  return `https://calendar.yahoo.com/?${params.toString()}`;
};

// Generate subscription URLs with aggressive cache-busting
export const getCalendarSubscriptionURL = (program?: string): string => {
  const baseUrl = 'https://rtnxxjwfffbqyrrulzym.supabase.co/functions/v1/calendar-feed';
  // Use current timestamp to force immediate refresh on every URL generation
  const cacheBuster = Date.now();
  const programParam = program && program !== 'All Programs' ? `program=${encodeURIComponent(program)}&` : '';
  return `${baseUrl}?${programParam}v=${cacheBuster}&t=${Math.random()}`;
};

export const getWebcalSubscriptionURL = (program?: string): string => {
  return getCalendarSubscriptionURL(program).replace('https://', 'webcal://');
};

export const generateCalendarInstructions = (program?: string) => {
  const subscriptionUrl = getCalendarSubscriptionURL(program);
  const webcalUrl = getWebcalSubscriptionURL(program);
  
  return {
    subscriptionUrl,
    webcalUrl,
    instructions: {
      google: "1. Open Google Calendar\n2. Click '+' next to 'Other calendars'\n3. Select 'From URL'\n4. Paste the subscription URL",
      apple: "1. Open Calendar app\n2. File > New Calendar Subscription\n3. Paste the webcal URL\n4. Configure refresh frequency",
      outlook: "1. Open Outlook Calendar\n2. Add Calendar > From Internet\n3. Paste the subscription URL\n4. Set update frequency",
      thunderbird: "1. Right-click calendar list\n2. New Calendar > On the Network\n3. Select iCalendar (ICS)\n4. Paste the subscription URL"
    }
  };
};