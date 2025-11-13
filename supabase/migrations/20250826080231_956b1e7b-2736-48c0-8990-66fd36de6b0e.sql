-- Add additional_images column to news_articles table
ALTER TABLE public.news_articles 
ADD COLUMN additional_images JSONB DEFAULT '[]'::jsonb;

-- Drop the separate news_article_images table
DROP TABLE IF EXISTS public.news_article_images;