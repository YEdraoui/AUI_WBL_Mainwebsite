-- Create enums for file types and categories
CREATE TYPE public.file_type_enum AS ENUM (
    'pdf',
    'doc',
    'docx',
    'ppt',
    'pptx',
    'xls',
    'xlsx'
);

CREATE TYPE public.resource_category_enum AS ENUM (
    'academic_resources',
    'career_guides',
    'application_templates',
    'industry_reports',
    'program_information',
    'student_handbook',
    'company_profiles'
);

-- Update the resources table to use the enums
ALTER TABLE public.resources 
ALTER COLUMN file_type TYPE public.file_type_enum USING file_type::public.file_type_enum;

ALTER TABLE public.resources 
ALTER COLUMN category TYPE public.resource_category_enum USING category::public.resource_category_enum;