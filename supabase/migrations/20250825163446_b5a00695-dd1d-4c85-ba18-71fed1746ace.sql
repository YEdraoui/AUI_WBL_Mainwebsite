-- Create enum for service categories
CREATE TYPE service_category AS ENUM ('coop', 'remote', 'alternance', 'general');

-- Create booking_services table
CREATE TABLE public.booking_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  booking_link TEXT NOT NULL,
  category service_category,
  duration TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.booking_services ENABLE ROW LEVEL SECURITY;

-- Create policies for booking services
CREATE POLICY "Booking services are viewable by everyone" 
ON public.booking_services 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can insert booking services" 
ON public.booking_services 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update booking services" 
ON public.booking_services 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete booking services" 
ON public.booking_services 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_booking_services_updated_at
BEFORE UPDATE ON public.booking_services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert starter services
INSERT INTO public.booking_services (title, description, booking_link, category, duration, display_order) VALUES
('Meet the Program Lead', 'Learn which track fits you best and how to apply.', '#', 'general', '30 min', 1),
('CV Editing Session', 'Get expert feedback to make your resume stand out.', '#', 'general', '45 min', 2),
('Interview Prep', 'Practice questions and get actionable tips.', '#', 'general', '60 min', 3);