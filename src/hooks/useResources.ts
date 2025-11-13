import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useResources = () => {
  return useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case 'ppt':
    case 'pptx':
      return 'presentation';
    case 'doc':
    case 'docx':
      return 'document';
    case 'pdf':
    default:
      return 'file';
  }
};

export const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    presentations: "Presentations",
    student_guides: "Student Guides",
    employer_guides: "Employer Guides",
    cv_interview_guides: "CV & Interview Guides"
  };
  return labels[category] || category;
};