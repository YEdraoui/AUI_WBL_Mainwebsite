-- Update enum values by altering the existing type
ALTER TYPE program_type RENAME TO program_type_old;
CREATE TYPE program_type AS ENUM ('Co-op', 'Remote@AUI', 'Alternance', 'All Programs');

-- Update existing data to new enum values
ALTER TABLE public.events 
ALTER COLUMN program TYPE program_type USING 
  CASE 
    WHEN program::text = 'coop' THEN 'Co-op'::program_type
    WHEN program::text = 'remote' THEN 'Remote@AUI'::program_type
    WHEN program::text = 'alternance' THEN 'Alternance'::program_type
    WHEN program::text = 'global' THEN 'All Programs'::program_type
    ELSE 'All Programs'::program_type
  END;

-- Drop the old type
DROP TYPE program_type_old;