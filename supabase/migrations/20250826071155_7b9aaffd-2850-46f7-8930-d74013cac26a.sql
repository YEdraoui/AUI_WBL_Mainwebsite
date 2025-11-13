-- Create news_articles table for news and event articles
CREATE TABLE public.news_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_name TEXT,
  category TEXT CHECK (category IN ('news', 'event', 'announcement')) NOT NULL DEFAULT 'news',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Create policies for news articles
CREATE POLICY "News articles are viewable by everyone" 
ON public.news_articles 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can insert news articles" 
ON public.news_articles 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update news articles" 
ON public.news_articles 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete news articles" 
ON public.news_articles 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON public.news_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for news article images
INSERT INTO storage.buckets (id, name, public) VALUES ('news-images', 'news-images', true);

-- Create storage policies for news images
CREATE POLICY "News images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'news-images');

CREATE POLICY "Only admins can upload news images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'news-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update news images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'news-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete news images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'news-images' AND has_role(auth.uid(), 'admin'::app_role));