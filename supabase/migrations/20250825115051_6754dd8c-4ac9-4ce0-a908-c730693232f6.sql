-- First, let's add the new enum values
ALTER TYPE resource_category_enum ADD VALUE IF NOT EXISTS 'presentations';
ALTER TYPE resource_category_enum ADD VALUE IF NOT EXISTS 'student_guides';
ALTER TYPE resource_category_enum ADD VALUE IF NOT EXISTS 'employer_guides';
ALTER TYPE resource_category_enum ADD VALUE IF NOT EXISTS 'cv_interview_guides';

-- Update existing records to use the new enum values (optional - only if you have existing data)
UPDATE resources SET category = 'presentations' WHERE category = 'program_information';
UPDATE resources SET category = 'student_guides' WHERE category = 'academic_resources';
UPDATE resources SET category = 'employer_guides' WHERE category = 'career_guides';
UPDATE resources SET category = 'cv_interview_guides' WHERE category = 'application_templates';

-- Note: We cannot remove old enum values if they are still referenced in the table
-- If you want to completely replace the enum, you would need to:
-- 1. Update all existing data first
-- 2. Create a new enum type
-- 3. Alter the table to use the new enum type
-- 4. Drop the old enum type