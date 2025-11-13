-- Create table for "Who We Are" section images
CREATE TABLE public.who_we_are_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.who_we_are_images ENABLE ROW LEVEL SECURITY;

-- Create policy for public viewing
CREATE POLICY "Who We Are images are viewable by everyone" 
ON public.who_we_are_images 
FOR SELECT 
USING (is_active = true);

-- Create policies for admin management
CREATE POLICY "Only admins can insert Who We Are images" 
ON public.who_we_are_images 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update Who We Are images" 
ON public.who_we_are_images 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete Who We Are images" 
ON public.who_we_are_images 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_who_we_are_images_updated_at
BEFORE UPDATE ON public.who_we_are_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();