-- Create enum type for program values
CREATE TYPE program_type AS ENUM ('coop', 'remote', 'alternance', 'global');

-- Update the events table to use the enum type
ALTER TABLE public.events 
DROP CONSTRAINT IF EXISTS events_program_check,
ALTER COLUMN program TYPE program_type USING program::program_type;