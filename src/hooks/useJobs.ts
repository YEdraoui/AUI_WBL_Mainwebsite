import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type JobStatus = 'open' | 'upcoming' | 'closed';
export type ModalityType = 'onsite' | 'hybrid' | 'remote';

export interface Job {
  id: string;
  title: string;
  company_name: string;
  company_logo_url: string | null;
  program_type: string;
  application_deadline: string;
  apply_now_link: string;
  location: string | null;
  modality: ModalityType | null;
  compensation_range: string | null;
  tags: string[] | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface JobsFilters {
  program?: string;
  status?: JobStatus;
  search?: string;
  modality?: ModalityType;
}

export const useJobs = (filters?: JobsFilters) => {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: async (): Promise<Job[]> => {
      let query = supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('application_deadline', { ascending: true });

      // Apply program filter
      if (filters?.program && filters.program !== 'All Programs') {
        query = query.eq('program_type', filters.program as any);
      }

      // Apply search filter
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      // Apply modality filter
      if (filters?.modality) {
        query = query.eq('modality', filters.modality);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      }

      // Filter by status client-side since we need to compute status based on current time
      let filteredData = data || [];
      
      if (filters?.status) {
        const now = new Date();
        filteredData = filteredData.filter(job => {
          const deadline = new Date(job.application_deadline);
          const daysDiff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 3600 * 24));
          
          if (filters.status === 'closed') return daysDiff < 0;
          if (filters.status === 'open') return daysDiff >= 0 && daysDiff <= 7;
          if (filters.status === 'upcoming') return daysDiff > 7;
          
          return true;
        });
      }

      return filteredData;
    },
  });
};

export const getJobStatus = (deadline: string): JobStatus => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const daysDiff = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
  
  if (daysDiff < 0) return 'closed';
  if (daysDiff <= 7) return 'open';
  return 'upcoming';
};