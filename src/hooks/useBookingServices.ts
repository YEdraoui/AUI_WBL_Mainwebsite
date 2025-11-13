import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useBookingServices = () => {
  return useQuery({
    queryKey: ["booking-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("booking_services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data;
    },
  });
};

export const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    coop: "bg-blue-100 text-blue-800",
    remote: "bg-green-100 text-green-800", 
    alternance: "bg-purple-100 text-purple-800",
    general: "bg-gray-100 text-gray-800"
  };
  return colors[category] || colors.general;
};

export const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    coop: "Co-op",
    remote: "Remote@AUI",
    alternance: "Alternance",
    general: "General"
  };
  return labels[category] || category;
};