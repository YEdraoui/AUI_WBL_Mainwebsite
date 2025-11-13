-- Create partnership_requests table
CREATE TABLE public.partnership_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role_project_type TEXT NOT NULL,
  timeline TEXT,
  additional_notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.partnership_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert partnership requests (public form)
CREATE POLICY "Anyone can submit partnership requests" 
ON public.partnership_requests 
FOR INSERT 
WITH CHECK (true);

-- Create policy for viewing requests (you might want to restrict this later)
CREATE POLICY "Partnership requests are viewable by authenticated users" 
ON public.partnership_requests 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_partnership_requests_updated_at
BEFORE UPDATE ON public.partnership_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();