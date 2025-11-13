-- Create table for additional news article images
CREATE TABLE public.news_article_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.news_articles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news_article_images ENABLE ROW LEVEL SECURITY;

-- Create policies for news article images
CREATE POLICY "News article images are viewable by everyone" 
ON public.news_article_images 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can insert news article images" 
ON public.news_article_images 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update news article images" 
ON public.news_article_images 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete news article images" 
ON public.news_article_images 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for better performance
CREATE INDEX idx_news_article_images_article_id ON public.news_article_images(article_id);
CREATE INDEX idx_news_article_images_display_order ON public.news_article_images(display_order);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_article_images_updated_at
BEFORE UPDATE ON public.news_article_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();