-- Add check constraint to program field to enforce dropdown values
ALTER TABLE public.events 
ADD CONSTRAINT events_program_check 
CHECK (program IN ('coop', 'remote', 'alternance', 'global'));

-- Update existing data if needed (in case there are any invalid values)
UPDATE public.events 
SET program = 'global' 
WHERE program NOT IN ('coop', 'remote', 'alternance', 'global');