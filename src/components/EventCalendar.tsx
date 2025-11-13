import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEvents, Event } from "@/hooks/useEvents";
import { format, parseISO, isSameDay, startOfDay } from "date-fns";
import { Clock, MapPin, ExternalLink, AlertCircle, Download, Calendar as CalendarIcon, Share2, ChevronDown, ChevronUp } from "lucide-react";
import { 
  downloadICS, 
  generateGoogleCalendarURL, 
  generateOutlookCalendarURL, 
  generateYahooCalendarURL,
  generateCalendarInstructions
} from "@/utils/calendarUtils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface EventCalendarProps {
  program?: 'Co-op' | 'Remote@AUI' | 'Alternance' | 'All Programs';
  title?: string;
  showAllPrograms?: boolean;
}

const EventCalendar = ({ program, title = "Events Calendar", showAllPrograms = false }: EventCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllPast, setShowAllPast] = useState(false);
  const { data: events = [], isLoading } = useEvents(showAllPrograms ? undefined : program);
  const { toast } = useToast();

  const calendarInfo = generateCalendarInstructions(showAllPrograms ? undefined : program);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedUrl(type);
      toast({
        title: "Copied to clipboard",
        description: `${type} URL copied successfully`,
      });
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the URL manually",
        variant: "destructive",
      });
    }
  };

  const getProgramColor = (program: string) => {
    switch (program) {
      case 'Co-op':
        return 'bg-gradient-to-r from-coop to-coop-light';
      case 'Remote@AUI':
        return 'bg-gradient-to-r from-remote to-remote-light';
      case 'Alternance':
        return 'bg-gradient-to-r from-alternance to-alternance-light';
      case 'All Programs':
        return 'bg-gradient-to-r from-primary to-primary/80';
      default:
        return 'bg-muted';
    }
  };

  const getProgramLabel = (program: string) => {
    switch (program) {
      case 'Co-op':
        return 'Co-op Program';
      case 'Remote@AUI':
        return 'Remote@AUI';
      case 'Alternance':
        return 'Alternance Program';
      case 'All Programs':
        return 'All Programs';
      default:
        return program;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-muted rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate all derived data
  const now = new Date();
  const todayStart = startOfDay(now);

  // De-duplicate any accidental duplicates by id
  const uniqueEvents: Event[] = Array.from(new Map(events.map(e => [e.id, e])).values());

  // Upcoming = events that start today or later (day-based)
  const upcomingSorted = uniqueEvents
    .filter(event => parseISO(event.start_datetime) >= todayStart)
    .sort((a, b) => parseISO(a.start_datetime).getTime() - parseISO(b.start_datetime).getTime());

  // Past = events whose start is before today (day-based, guarantees exclusivity)
  const pastSorted = uniqueEvents
    .filter(event => parseISO(event.start_datetime) < todayStart)
    .sort((a, b) => parseISO(b.start_datetime).getTime() - parseISO(a.start_datetime).getTime());


  // Ensure exclusivity
  const pastIds = new Set(pastSorted.map(e => e.id));
  const upcomingExclusive = upcomingSorted.filter(e => !pastIds.has(e.id));

  const upcomingEvents = (showAllUpcoming ? upcomingExclusive : upcomingExclusive.slice(0, 5));
  const pastEvents = (showAllPast ? pastSorted : pastSorted.slice(0, 5));

  const eventDates = events.map(event => parseISO(event.start_datetime));
  const deadlineDates = events
    .filter(event => event.application_deadline)
    .map(event => parseISO(event.application_deadline!));

  const selectedDateEvents = selectedDate 
    ? events.filter(event => isSameDay(parseISO(event.start_datetime), selectedDate))
    : [];

  const selectedDateDeadlines = selectedDate 
    ? events.filter(event => 
        event.application_deadline && 
        isSameDay(parseISO(event.application_deadline), selectedDate)
      )
    : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {title}
                {events.length > 0 && (
                  <Badge variant="secondary">{events.length} events</Badge>
                )}
              </CardTitle>
              <CardDescription>
                Click on a date to view specific events and deadlines
              </CardDescription>
            </div>
            
            {/* Calendar Subscription Options */}
            {events.length > 0 && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadICS(events)}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Subscribe to Calendar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Subscribe to AUI Events Calendar</DialogTitle>
                      <DialogDescription>
                        Add this calendar to your personal calendar app to automatically receive updates when new events are added.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="subscription-url">Calendar Subscription URL</Label>
                        <div className="flex gap-2">
                          <Input
                            id="subscription-url"
                            value={calendarInfo.subscriptionUrl}
                            readOnly
                            className="font-mono text-sm"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(calendarInfo.subscriptionUrl, "Subscription")}
                          >
                            {copiedUrl === "Subscription" ? 
                              <CheckCircle className="h-4 w-4" /> : 
                              <Copy className="h-4 w-4" />
                            }
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="webcal-url">Webcal URL (for Apple Calendar)</Label>
                        <div className="flex gap-2">
                          <Input
                            id="webcal-url"
                            value={calendarInfo.webcalUrl}
                            readOnly
                            className="font-mono text-sm"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(calendarInfo.webcalUrl, "Webcal")}
                          >
                            {copiedUrl === "Webcal" ? 
                              <CheckCircle className="h-4 w-4" /> : 
                              <Copy className="h-4 w-4" />
                            }
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Google Calendar</CardTitle>
                          </CardHeader>
                          <CardContent className="text-xs text-muted-foreground">
                            {calendarInfo.instructions.google}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Apple Calendar</CardTitle>
                          </CardHeader>
                          <CardContent className="text-xs text-muted-foreground">
                            {calendarInfo.instructions.apple}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Microsoft Outlook</CardTitle>
                          </CardHeader>
                          <CardContent className="text-xs text-muted-foreground">
                            {calendarInfo.instructions.outlook}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Thunderbird</CardTitle>
                          </CardHeader>
                          <CardContent className="text-xs text-muted-foreground">
                            {calendarInfo.instructions.thunderbird}
                          </CardContent>
                        </Card>
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <strong>Note:</strong> After subscribing, your calendar will automatically sync with new events and updates. 
                          The refresh frequency depends on your calendar app settings (typically every few hours).
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className={`grid grid-cols-1 gap-6 ${selectedDate ? 'xl:grid-cols-3' : 'xl:grid-cols-2'}`}>
            {/* Calendar */}
            <div className={`flex flex-col items-center justify-center ${selectedDate ? '' : 'py-8 px-4'}`}>
              <div className={`transition-all duration-300 ${selectedDate ? '' : 'scale-125 transform-gpu'}`}>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    hasEvent: eventDates,
                    hasDeadline: deadlineDates,
                  }}
                  modifiersStyles={{
                    hasEvent: {
                      backgroundColor: 'hsl(var(--primary))',
                      color: 'hsl(var(--primary-foreground))',
                      fontWeight: 'bold'
                    },
                    hasDeadline: {
                      backgroundColor: 'hsl(var(--destructive))',
                      color: 'hsl(var(--destructive-foreground))',
                      fontWeight: 'bold'
                    }
                  }}
                />
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary"></div>
                    <span>Event dates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-destructive"></div>
                    <span>Application deadlines</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Date Events and Deadlines - Only show when date is selected */}
            {selectedDate && (
              <div>
                <h3 className="font-semibold mb-4">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </h3>
                
                <div className="space-y-4">
                  {/* Events on selected date */}
                  {selectedDateEvents.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Events</h4>
                      <div className="space-y-3">
                        {selectedDateEvents.map((event: Event) => (
                          <Card key={event.id} className="border-l-4 border-l-primary">
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-base">{event.event_name}</CardTitle>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge 
                                      variant="secondary" 
                                      className={`${getProgramColor(event.program)} text-white border-0 text-xs`}
                                    >
                                      {getProgramLabel(event.program)}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {format(parseISO(event.start_datetime), "h:mm a")} - {format(parseISO(event.end_datetime), "h:mm a")}
                                </span>
                              </div>
                              
                              {event.location && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                              )}

                              {event.description && (
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                              )}

                              <div className="flex gap-2">
                                {event.apply_now_link && (
                                  <Button 
                                    size="sm" 
                                    className="flex-1"
                                    onClick={() => window.open(event.apply_now_link!, "_blank", "noopener,noreferrer")}
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Apply Now
                                  </Button>
                                )}
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <CalendarIcon className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Add to Calendar</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      onClick={() => window.open(generateGoogleCalendarURL(event), '_blank')}
                                    >
                                      Google Calendar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => window.open(generateOutlookCalendarURL(event), '_blank')}
                                    >
                                      Microsoft Outlook
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => window.open(generateYahooCalendarURL(event), '_blank')}
                                    >
                                      Yahoo Calendar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => downloadICS([event], `${event.event_name.replace(/[^a-z0-9]/gi, '_')}.ics`)}
                                    >
                                      Download ICS
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Application deadlines on selected date */}
                  {selectedDateDeadlines.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Application Deadlines</h4>
                      <div className="space-y-3">
                        {selectedDateDeadlines.map((event: Event) => (
                          <Card key={`deadline-${event.id}`} className="border-l-4 border-l-destructive">
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-base">{event.event_name}</CardTitle>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge 
                                      variant="secondary" 
                                      className={`${getProgramColor(event.program)} text-white border-0 text-xs`}
                                    >
                                      {getProgramLabel(event.program)}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-destructive">
                                <AlertCircle className="h-4 w-4" />
                                <span>
                                  Application deadline: {format(parseISO(event.application_deadline!), "h:mm a")}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>
                                  Event: {format(parseISO(event.start_datetime), "MMM d, h:mm a")} - {format(parseISO(event.end_datetime), "h:mm a")}
                                </span>
                              </div>

                              {event.location && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                              )}

                              {event.description && (
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                              )}

                              <div className="flex gap-2">
                                {event.apply_now_link && (
                                  <Button 
                                    size="sm" 
                                    className="flex-1"
                                    onClick={() => window.open(event.apply_now_link!, "_blank", "noopener,noreferrer")}
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Apply Now
                                  </Button>
                                )}
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <CalendarIcon className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Add to Calendar</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      onClick={() => window.open(generateGoogleCalendarURL(event), '_blank')}
                                    >
                                      Google Calendar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => window.open(generateOutlookCalendarURL(event), '_blank')}
                                    >
                                      Microsoft Outlook
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => window.open(generateYahooCalendarURL(event), '_blank')}
                                    >
                                      Yahoo Calendar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => downloadICS([event], `${event.event_name.replace(/[^a-z0-9]/gi, '_')}.ics`)}
                                    >
                                      Download ICS
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDateEvents.length === 0 && selectedDateDeadlines.length === 0 && (
                    <Card>
                      <CardContent className="flex items-center justify-center py-6">
                        <p className="text-muted-foreground">No events or deadlines for this date</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Upcoming and Past Events */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Upcoming Events</h3>
                  {upcomingExclusive.length > 5 && (
                    <Button variant="ghost" size="sm" onClick={() => setShowAllUpcoming(v => !v)} className="h-8 px-2 text-xs">
                      {showAllUpcoming ? <>Show less <ChevronUp className="h-3 w-3 ml-1" /></> : <>Show all <ChevronDown className="h-3 w-3 ml-1" /></>}
                    </Button>
                  )}
                </div>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingEvents.map((event: Event) => (
                      <Card key={event.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm line-clamp-2">{event.event_name}</h4>
                            <Badge 
                              variant="secondary" 
                              className={`${getProgramColor(event.program)} text-white border-0 text-xs`}
                            >
                              {event.program}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{format(parseISO(event.start_datetime), "MMM d, h:mm a")}</span>
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}

                          {event.description && (
                            <p className="text-xs text-muted-foreground line-clamp-3">{event.description}</p>
                          )}

                          {event.application_deadline && (
                            <div className="flex items-center gap-2 text-xs text-destructive">
                              <AlertCircle className="h-3 w-3" />
                              <span>
                                Application Deadline: {format(parseISO(event.application_deadline), "MMM d, yyyy")}
                              </span>
                            </div>
                          )}

                          <div className="flex gap-2">
                            {event.apply_now_link && (
                              <Button 
                                size="sm" 
                                className="flex-1 text-xs h-8"
                                onClick={() => window.open(event.apply_now_link!, "_blank", "noopener,noreferrer")}
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Apply Now
                              </Button>
                            )}
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="text-xs h-8 px-2">
                                  <CalendarIcon className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Add to Calendar</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => window.open(generateGoogleCalendarURL(event), '_blank')}
                                >
                                  Google Calendar
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => window.open(generateOutlookCalendarURL(event), '_blank')}
                                >
                                  Microsoft Outlook
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => window.open(generateYahooCalendarURL(event), '_blank')}
                                >
                                  Yahoo Calendar
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => downloadICS([event], `${event.event_name.replace(/[^a-z0-9]/gi, '_')}.ics`)}
                                >
                                  Download ICS
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No upcoming events</p>
                )}
              </div>

              {/* Past Events */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Past Events</h3>
                  {pastSorted.length > 5 && (
                    <Button variant="ghost" size="sm" onClick={() => setShowAllPast(v => !v)} className="h-8 px-2 text-xs">
                      {showAllPast ? <>Show less <ChevronUp className="h-3 w-3 ml-1" /></> : <>Show all <ChevronDown className="h-3 w-3 ml-1" /></>}
                    </Button>
                  )}
                </div>
                {pastEvents.length > 0 ? (
                  <div className="space-y-3">
                    {pastEvents.map((event: Event) => (
                      <Card key={event.id} className="p-4 opacity-60 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setSelectedDate(parseISO(event.start_datetime))}>
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm line-clamp-2">{event.event_name}</h4>
                            <Badge 
                              variant="secondary" 
                              className={`${getProgramColor(event.program)} text-white border-0 text-xs`}
                            >
                              {event.program}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{format(parseISO(event.start_datetime), "MMM d, h:mm a")}</span>
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}

                          {event.description && (
                            <p className="text-xs text-muted-foreground line-clamp-3">{event.description}</p>
                          )}

                          {event.application_deadline && (
                            <div className="flex items-center gap-2 text-xs text-destructive">
                              <AlertCircle className="h-3 w-3" />
                              <span>
                                Application Deadline: {format(parseISO(event.application_deadline), "MMM d, yyyy")}
                              </span>
                            </div>
                          )}

                          {event.apply_now_link && (
                            <Button 
                              size="sm" 
                              className="w-full text-xs h-8 opacity-75"
                              onClick={() => window.open(event.apply_now_link!, "_blank", "noopener,noreferrer")}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Apply Now
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No past events</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCalendar;