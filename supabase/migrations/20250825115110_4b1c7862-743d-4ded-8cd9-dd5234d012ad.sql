-- Add the new enum values for resource categories
ALTER TYPE resource_category_enum ADD VALUE IF NOT EXISTS 'presentations';
ALTER TYPE resource_category_enum ADD VALUE IF NOT EXISTS 'student_guides';
ALTER TYPE resource_category_enum ADD VALUE IF NOT EXISTS 'employer_guides';
ALTER TYPE resource_category_enum ADD VALUE IF NOT EXISTS 'cv_interview_guides';