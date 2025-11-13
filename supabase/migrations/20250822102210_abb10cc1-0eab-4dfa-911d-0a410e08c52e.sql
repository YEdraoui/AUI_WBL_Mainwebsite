-- Drop the existing enum and recreate with the exact names
DROP TYPE IF EXISTS program_type CASCADE;
CREATE TYPE program_type AS ENUM ('Co-op', 'Remote@AUI', 'Alternance', 'All Programs');

-- Update the events table to use the new enum type
ALTER TABLE public.events 
ALTER COLUMN program TYPE program_type USING 
  CASE 
    WHEN program = 'coop' THEN 'Co-op'::program_type
    WHEN program = 'remote' THEN 'Remote@AUI'::program_type
    WHEN program = 'alternance' THEN 'Alternance'::program_type
    WHEN program = 'global' THEN 'All Programs'::program_type
    ELSE 'All Programs'::program_type
  END;