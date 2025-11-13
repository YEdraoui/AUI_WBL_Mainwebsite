import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Event {
  id: string;
  event_name: string;
  program: 'Co-op' | 'Remote@AUI' | 'Alternance' | 'All Programs';
  start_datetime: string;
  end_datetime: string;
  application_deadline: string | null;
  apply_now_link: string | null;
  description: string | null;
  location: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

  const generateICS = (events: Event[]): string => {
    const formatICSDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const escapeICSText = (text: string) => {
      return text.replace(/\\/g, '\\\\')
                 .replace(/;/g, '\\;')
                 .replace(/,/g, '\\,')
                 .replace(/\n/g, '\\n')
                 .replace(/\r/g, '');
    };

    // Generate a unique version based on the latest update time
    const latestUpdate = events.length > 0 
      ? Math.max(...events.map(e => new Date(e.updated_at).getTime()))
      : Date.now();
    const calendarVersion = Math.floor(latestUpdate / 1000); // Unix timestamp
    
    let icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//AUI Career Programs//Events Calendar V${calendarVersion}//EN\r\nCALNAME:AUI Career Programs Events\r\nX-WR-CALNAME:AUI Career Programs Events\r\nX-WR-CALDESC:Events and deadlines for Co-op, Remote@AUI, and Alternance programs\r\nX-WR-TIMEZONE:UTC\r\nMETHOD:PUBLISH\r\nX-WR-RELCALID:aui-events-${calendarVersion}\r\n`;

  events.forEach(event => {
    const startDate = formatICSDate(event.start_datetime);
    const endDate = formatICSDate(event.end_datetime);
    
    let description = event.description || '';
    if (event.location) description += `\\nLocation: ${event.location}`;
    if (event.apply_now_link) description += `\\nApply: ${event.apply_now_link}`;
    
    // Main event
    icsContent += `BEGIN:VEVENT\r\n`;
    icsContent += `UID:${event.id}@aui-events.com\r\n`;
    icsContent += `DTSTART:${startDate}\r\n`;
    icsContent += `DTEND:${endDate}\r\n`;
    icsContent += `DTSTAMP:${formatICSDate(event.updated_at)}\r\n`;
    icsContent += `SUMMARY:${escapeICSText(event.event_name)} (${event.program})\r\n`;
    icsContent += `DESCRIPTION:${escapeICSText(description)}\r\n`;
    if (event.location) {
      icsContent += `LOCATION:${escapeICSText(event.location)}\r\n`;
    }
    icsContent += `STATUS:CONFIRMED\r\n`;
    icsContent += `END:VEVENT\r\n`;

    // Application deadline as separate event if exists
    if (event.application_deadline) {
      const deadlineDate = formatICSDate(event.application_deadline);
      const deadlineEndDate = formatICSDate(new Date(new Date(event.application_deadline).getTime() + 60 * 60 * 1000).toISOString());
      
      icsContent += `BEGIN:VEVENT\r\n`;
      icsContent += `UID:${event.id}-deadline@aui-events.com\r\n`;
      icsContent += `DTSTART:${deadlineDate}\r\n`;
      icsContent += `DTEND:${deadlineEndDate}\r\n`;
      icsContent += `DTSTAMP:${formatICSDate(event.updated_at)}\r\n`;
      icsContent += `SUMMARY:Application Deadline: ${escapeICSText(event.event_name)}\r\n`;
      icsContent += `DESCRIPTION:Application deadline for ${escapeICSText(event.event_name)} (${event.program})${event.apply_now_link ? `\\nApply: ${event.apply_now_link}` : ''}\r\n`;
      icsContent += `STATUS:CONFIRMED\r\n`;
      icsContent += `END:VEVENT\r\n`;
    }
  });

  icsContent += `END:VCALENDAR\r\n`;
  return icsContent;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get query parameters for filtering
    const url = new URL(req.url);
    const program = url.searchParams.get('program');
    const version = url.searchParams.get('v'); // Cache-busting parameter
    const timestamp = url.searchParams.get('t'); // Additional cache-busting

    // Build query
    let query = supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('start_datetime', { ascending: true });

    // Apply program filter if specified
    if (program && program !== 'All Programs') {
      query = query.in('program', [program, 'All Programs']);
    }

    const { data: events, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return new Response('Error fetching events', { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    // Generate ICS content
    const icsContent = generateICS(events || []);
    
    // Generate ETag and Last-Modified for better caching
    const latestUpdate = events && events.length > 0 
      ? Math.max(...events.map(e => new Date(e.updated_at).getTime()))
      : Date.now();
    const etag = `"${latestUpdate}"`;
    const lastModified = new Date(latestUpdate).toUTCString();

    // Return ICS file with proper headers for calendar subscription
    return new Response(icsContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'inline; filename="aui-events.ics"',
        'Cache-Control': 'no-cache, no-store, must-revalidate', // Force refresh every time
        'Pragma': 'no-cache', // HTTP/1.0 compatibility
        'Expires': '0', // Ensure immediate expiry
        'ETag': etag,
        'Last-Modified': lastModified,
        'Vary': 'program, v, t',
      },
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response('Internal server error', { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
    });
  }
})