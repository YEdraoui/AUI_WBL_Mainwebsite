-- Create table for success story videos
CREATE TABLE public.success_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  department TEXT,
  video_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.success_videos ENABLE ROW LEVEL SECURITY;

-- Create policy for public viewing
CREATE POLICY "Success videos are viewable by everyone" 
ON public.success_videos 
FOR SELECT 
USING (is_active = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_success_videos_updated_at
BEFORE UPDATE ON public.success_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.success_videos (title, company, department, video_url, display_order) VALUES
('My Co-op Experience at Tech Corp', 'Tech Corp', 'Engineering', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1),
('Remote Work Success Story', 'Digital Solutions', 'Marketing', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 2),
('Alternance Program Journey', 'Innovation Labs', 'Data Science', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 3);