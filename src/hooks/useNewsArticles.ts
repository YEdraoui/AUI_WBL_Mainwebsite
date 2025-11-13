import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AdditionalImage {
  image_url: string;
  caption?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  featured_image_url: string | null;
  author_name: string | null;
  category: 'news' | 'event' | 'announcement';
  is_featured: boolean;
  is_active: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  additional_images?: AdditionalImage[];
}

type DatabaseNewsArticle = {
  id: string;
  title: string;
  summary: string;
  content: string;
  featured_image_url: string | null;
  author_name: string | null;
  category: string;
  is_featured: boolean;
  is_active: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  additional_images: any;
}

export const useNewsArticles = (category?: 'news' | 'event' | 'announcement') => {
  return useQuery({
    queryKey: ['news-articles', category],
    queryFn: async (): Promise<NewsArticle[]> => {
      let query = supabase
        .from('news_articles')
        .select('*')
        .eq('is_active', true)
        .order('published_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching news articles:', error);
        throw error;
      }

      return (data as DatabaseNewsArticle[])?.map(article => ({
        ...article,
        category: article.category as 'news' | 'event' | 'announcement',
        additional_images: Array.isArray(article.additional_images) ? article.additional_images as AdditionalImage[] : []
      })) || [];
    },
  });
};

export const useCreateNewsArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (article: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => {
      const { additional_images, ...articleData } = article;
      const insertData: any = {
        ...articleData,
        additional_images: additional_images || []
      };
      
      const { data, error } = await supabase
        .from('news_articles')
        .insert([insertData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-articles'] });
    },
  });
};

export const useUpdateNewsArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, additional_images, ...updates }: Partial<NewsArticle> & { id: string }) => {
      const updateData: any = { ...updates };
      if (additional_images !== undefined) {
        updateData.additional_images = additional_images;
      }
      
      const { data, error } = await supabase
        .from('news_articles')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-articles'] });
    },
  });
};

export const useDeleteNewsArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-articles'] });
    },
  });
};