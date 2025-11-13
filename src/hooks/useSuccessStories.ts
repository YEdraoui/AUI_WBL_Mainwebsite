import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SuccessStory {
  id: string;
  student_name: string;
  company_name: string;
  company_logo_url: string | null;
  student_image_url: string | null;
  experience_text: string;
  program_type: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useSuccessStories = (program: 'Co-op' | 'Remote@AUI' | 'Alternance') => {
  return useQuery({
    queryKey: ['success_stories', program],
    queryFn: async (): Promise<SuccessStory[]> => {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('program_type', program)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching success stories:', error);
        throw error;
      }

      return data || [];
    },
  });
};