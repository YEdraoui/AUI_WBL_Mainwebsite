-- Add provider information fields to booking_services table
ALTER TABLE public.booking_services ADD COLUMN provider_name TEXT;
ALTER TABLE public.booking_services ADD COLUMN provider_image_url TEXT;
ALTER TABLE public.booking_services ADD COLUMN provider_linkedin_url TEXT;
ALTER TABLE public.booking_services ADD COLUMN provider_bio TEXT;
ALTER TABLE public.booking_services ADD COLUMN full_description TEXT;

-- Update existing records with sample provider data
UPDATE public.booking_services 
SET 
  provider_name = CASE 
    WHEN title = 'Meet the Program Lead' THEN 'Dr. Sarah Johnson'
    WHEN title = 'CV Editing Session' THEN 'Mark Thompson'
    WHEN title = 'Interview Prep' THEN 'Lisa Chen'
    ELSE 'Expert Advisor'
  END,
  provider_bio = CASE 
    WHEN title = 'Meet the Program Lead' THEN 'Program Director with 15+ years in career development and student success.'
    WHEN title = 'CV Editing Session' THEN 'Senior HR Professional specializing in resume optimization and recruitment.'
    WHEN title = 'Interview Prep' THEN 'Career Coach with expertise in interview techniques and professional development.'
    ELSE 'Experienced professional in career guidance.'
  END,
  full_description = CASE 
    WHEN title = 'Meet the Program Lead' THEN 'Get personalized guidance on choosing the right program track for your career goals. Our program lead will help you understand the differences between Co-op, Remote@AUI, and Alternance programs, discuss application requirements, and create a tailored plan for your success. This comprehensive session covers program expectations, career outcomes, and next steps in your application process.'
    WHEN title = 'CV Editing Session' THEN 'Transform your resume into a powerful career tool with expert guidance. Our HR professional will review your current CV, provide detailed feedback on content, formatting, and presentation. You''ll learn industry best practices, how to highlight your achievements effectively, and tailor your resume for specific roles. The session includes before/after comparisons and actionable recommendations for improvement.'
    WHEN title = 'Interview Prep' THEN 'Master the art of interviewing with comprehensive preparation and practice. This session covers common interview questions, behavioral interview techniques, salary negotiation strategies, and industry-specific expectations. You''ll participate in mock interviews with real-time feedback, learn how to present your experience confidently, and develop strategies for handling challenging questions.'
    ELSE 'Comprehensive professional guidance session.'
  END,
  provider_linkedin_url = CASE 
    WHEN title = 'Meet the Program Lead' THEN 'https://linkedin.com/in/sarah-johnson-program-director'
    WHEN title = 'CV Editing Session' THEN 'https://linkedin.com/in/mark-thompson-hr'
    WHEN title = 'Interview Prep' THEN 'https://linkedin.com/in/lisa-chen-career-coach'
    ELSE 'https://linkedin.com/in/expert-advisor'
  END;