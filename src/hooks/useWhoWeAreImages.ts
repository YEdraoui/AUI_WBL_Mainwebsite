import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface WhoWeAreImage {
  id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useWhoWeAreImages = () => {
  return useQuery({
    queryKey: ["who-we-are-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("who_we_are_images")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching who we are images:", error);
        throw error;
      }

      return data as WhoWeAreImage[];
    },
  });
};