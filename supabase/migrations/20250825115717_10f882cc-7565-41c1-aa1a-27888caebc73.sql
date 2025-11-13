-- Remove old enum values and keep only the 4 new categories
-- First, create a new enum with only the desired values
CREATE TYPE resource_category_enum_new AS ENUM (
  'presentations',
  'student_guides', 
  'employer_guides',
  'cv_interview_guides'
);

-- Update the resources table to use the new enum
ALTER TABLE resources 
  ALTER COLUMN category TYPE resource_category_enum_new 
  USING category::text::resource_category_enum_new;

-- Drop the old enum and rename the new one
DROP TYPE resource_category_enum;
ALTER TYPE resource_category_enum_new RENAME TO resource_category_enum;