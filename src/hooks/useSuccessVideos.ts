import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SuccessVideo {
  id: string;
  title: string;
  company: string;
  department: string | null;
  video_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useSuccessVideos = () => {
  return useQuery({
    queryKey: ['success_videos'],
    queryFn: async (): Promise<SuccessVideo[]> => {
      const { data, error } = await supabase
        .from('success_videos')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching success videos:', error);
        throw error;
      }

      return data || [];
    },
  });
};