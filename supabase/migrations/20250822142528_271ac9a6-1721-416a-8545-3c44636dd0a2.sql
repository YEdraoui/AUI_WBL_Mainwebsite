-- Create enum for modality
CREATE TYPE public.modality_type AS ENUM ('onsite', 'hybrid', 'remote');

-- Create enum for job status
CREATE TYPE public.job_status AS ENUM ('open', 'upcoming', 'closed');

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_logo_url TEXT,
  program_type public.program_type NOT NULL,
  application_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  apply_now_link TEXT NOT NULL,
  location TEXT,
  modality public.modality_type,
  compensation_range TEXT,
  tags TEXT[],
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing active jobs
CREATE POLICY "Jobs are viewable by everyone" 
ON public.jobs 
FOR SELECT 
USING (is_active = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to get job status based on deadline
CREATE OR REPLACE FUNCTION public.get_job_status(deadline TIMESTAMP WITH TIME ZONE)
RETURNS public.job_status
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  IF deadline < now() THEN
    RETURN 'closed'::public.job_status;
  ELSIF deadline < now() + INTERVAL '7 days' THEN
    RETURN 'open'::public.job_status;
  ELSE
    RETURN 'upcoming'::public.job_status;
  END IF;
END;
$$;

-- Add some sample data
INSERT INTO public.jobs (title, company_name, company_logo_url, program_type, application_deadline, apply_now_link, location, modality, compensation_range, tags, description) VALUES
('Software Engineering Intern', 'Tech Corp', 'https://via.placeholder.com/100x100', 'Co-op', '2024-03-15 23:59:59+00', 'https://techcorp.com/apply', 'Casablanca, Morocco', 'hybrid', '$1000-1500/month', ARRAY['React', 'Node.js', 'TypeScript'], 'Join our development team for a 6-month co-op experience.'),
('Digital Marketing Specialist', 'Marketing Plus', 'https://via.placeholder.com/100x100', 'Remote@AUI', '2024-03-20 23:59:59+00', 'https://marketingplus.com/careers', 'Remote', 'remote', '$800-1200/month', ARRAY['Digital Marketing', 'SEO', 'Social Media'], 'Remote marketing position with flexible hours.'),
('Data Analyst Trainee', 'Data Insights', 'https://via.placeholder.com/100x100', 'Alternance', '2024-04-01 23:59:59+00', 'https://datainsights.com/jobs', 'Rabat, Morocco', 'onsite', '€1200-1800/month', ARRAY['Python', 'SQL', 'Tableau'], 'Alternance program combining work and study.');