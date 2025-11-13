import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Event {
  id: string;
  event_name: string;
  program: 'Co-op' | 'Remote@AUI' | 'Alternance' | 'All Programs';
  start_datetime: string;
  end_datetime: string;
  application_deadline: string | null;
  apply_now_link: string | null;
  description: string | null;
  location: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useEvents = (program?: 'Co-op' | 'Remote@AUI' | 'Alternance' | 'All Programs') => {
  return useQuery({
    queryKey: ['events', program],
    queryFn: async (): Promise<Event[]> => {
      let query = supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('start_datetime', { ascending: true });

      // If program is specified, get events for that program + All Programs events
      if (program && program !== 'All Programs') {
        query = query.in('program', [program, 'All Programs']);
      } else if (program === 'All Programs') {
        // For global view, show all events
        // No additional filter needed
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching events:', error);
        throw error;
      }

      return (data as Event[]) || [];
    },
  });
};