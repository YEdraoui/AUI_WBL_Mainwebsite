-- Create events table for calendar functionality
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  program TEXT NOT NULL CHECK (program IN ('coop', 'remote', 'alternance', 'global')),
  start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  application_deadline TIMESTAMP WITH TIME ZONE,
  apply_now_link TEXT,
  description TEXT,
  location TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to active events
CREATE POLICY "Events are viewable by everyone" 
ON public.events 
FOR SELECT 
USING (is_active = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add some sample events for testing
INSERT INTO public.events (event_name, program, start_datetime, end_datetime, application_deadline, apply_now_link, description, location) VALUES 
('Co-op Information Session', 'coop', '2024-02-15 14:00:00+00', '2024-02-15 15:30:00+00', '2024-02-10 23:59:59+00', 'https://recruitcrm.io/jobs/MyCareer', 'Learn about our co-op program opportunities', 'Student Center'),
('Remote Work Skills Workshop', 'remote', '2024-02-20 10:00:00+00', '2024-02-20 12:00:00+00', '2024-02-18 23:59:59+00', 'https://recruitcrm.io/jobs/MyCareer', 'Develop essential remote work skills', 'Online'),
('Alternance Program Orientation', 'alternance', '2024-02-25 09:00:00+00', '2024-02-25 11:00:00+00', '2024-02-22 23:59:59+00', 'https://recruitcrm.io/jobs/MyCareer', 'Orientation for new alternance participants', 'Conference Room A'),
('Career Fair', 'global', '2024-03-01 09:00:00+00', '2024-03-01 17:00:00+00', '2024-02-28 23:59:59+00', 'https://recruitcrm.io/jobs/MyCareer', 'Annual career fair with participating companies', 'Main Campus');