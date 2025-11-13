-- Fix the security issue with the function by adding security definer and search path
CREATE OR REPLACE FUNCTION public.get_job_status(deadline TIMESTAMP WITH TIME ZONE)
RETURNS public.job_status
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER
SET search_path = public
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