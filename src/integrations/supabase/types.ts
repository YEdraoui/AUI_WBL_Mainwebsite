export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      booking_services: {
        Row: {
          booking_link: string
          category: Database["public"]["Enums"]["service_category"] | null
          created_at: string
          description: string
          display_order: number | null
          duration: string | null
          full_description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          provider_bio: string | null
          provider_image_url: string | null
          provider_linkedin_url: string | null
          provider_name: string | null
          title: string
          updated_at: string
        }
        Insert: {
          booking_link: string
          category?: Database["public"]["Enums"]["service_category"] | null
          created_at?: string
          description: string
          display_order?: number | null
          duration?: string | null
          full_description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          provider_bio?: string | null
          provider_image_url?: string | null
          provider_linkedin_url?: string | null
          provider_name?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          booking_link?: string
          category?: Database["public"]["Enums"]["service_category"] | null
          created_at?: string
          description?: string
          display_order?: number | null
          duration?: string | null
          full_description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          provider_bio?: string | null
          provider_image_url?: string | null
          provider_linkedin_url?: string | null
          provider_name?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          application_deadline: string | null
          apply_now_link: string | null
          created_at: string
          description: string | null
          end_datetime: string
          event_name: string
          id: string
          is_active: boolean
          location: string | null
          program: Database["public"]["Enums"]["program_type"]
          start_datetime: string
          updated_at: string
        }
        Insert: {
          application_deadline?: string | null
          apply_now_link?: string | null
          created_at?: string
          description?: string | null
          end_datetime: string
          event_name: string
          id?: string
          is_active?: boolean
          location?: string | null
          program: Database["public"]["Enums"]["program_type"]
          start_datetime: string
          updated_at?: string
        }
        Update: {
          application_deadline?: string | null
          apply_now_link?: string | null
          created_at?: string
          description?: string | null
          end_datetime?: string
          event_name?: string
          id?: string
          is_active?: boolean
          location?: string | null
          program?: Database["public"]["Enums"]["program_type"]
          start_datetime?: string
          updated_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          application_deadline: string
          apply_now_link: string
          company_logo_url: string | null
          company_name: string
          compensation_range: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          location: string | null
          modality: Database["public"]["Enums"]["modality_type"] | null
          program_type: Database["public"]["Enums"]["program_type"]
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          application_deadline: string
          apply_now_link: string
          company_logo_url?: string | null
          company_name: string
          compensation_range?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          modality?: Database["public"]["Enums"]["modality_type"] | null
          program_type: Database["public"]["Enums"]["program_type"]
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          application_deadline?: string
          apply_now_link?: string
          company_logo_url?: string | null
          company_name?: string
          compensation_range?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          modality?: Database["public"]["Enums"]["modality_type"] | null
          program_type?: Database["public"]["Enums"]["program_type"]
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          additional_images: Json | null
          author_name: string | null
          category: string
          content: string
          created_at: string
          featured_image_url: string | null
          id: string
          is_active: boolean
          is_featured: boolean
          published_at: string | null
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          additional_images?: Json | null
          author_name?: string | null
          category?: string
          content: string
          created_at?: string
          featured_image_url?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          published_at?: string | null
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          additional_images?: Json | null
          author_name?: string | null
          category?: string
          content?: string
          created_at?: string
          featured_image_url?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          published_at?: string | null
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      "Partner companies": {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          sector: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          sector?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          sector?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      partnership_requests: {
        Row: {
          additional_notes: string | null
          company_name: string
          contact_person: string
          created_at: string
          email: string
          id: string
          is_active: boolean
          phone: string | null
          role_project_type: string
          timeline: string | null
          updated_at: string
        }
        Insert: {
          additional_notes?: string | null
          company_name: string
          contact_person: string
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          phone?: string | null
          role_project_type: string
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          additional_notes?: string | null
          company_name?: string
          contact_person?: string
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          phone?: string | null
          role_project_type?: string
          timeline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          category: Database["public"]["Enums"]["resource_category_enum"]
          created_at: string
          description: string | null
          file_name: string
          file_type: Database["public"]["Enums"]["file_type_enum"]
          file_url: string
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["resource_category_enum"]
          created_at?: string
          description?: string | null
          file_name: string
          file_type: Database["public"]["Enums"]["file_type_enum"]
          file_url: string
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["resource_category_enum"]
          created_at?: string
          description?: string | null
          file_name?: string
          file_type?: Database["public"]["Enums"]["file_type_enum"]
          file_url?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          company_logo_url: string | null
          company_name: string
          created_at: string
          display_order: number | null
          experience_text: string
          id: string
          is_active: boolean | null
          program_type: Database["public"]["Enums"]["program_type"]
          student_image_url: string | null
          student_name: string
          updated_at: string
        }
        Insert: {
          company_logo_url?: string | null
          company_name: string
          created_at?: string
          display_order?: number | null
          experience_text: string
          id?: string
          is_active?: boolean | null
          program_type: Database["public"]["Enums"]["program_type"]
          student_image_url?: string | null
          student_name: string
          updated_at?: string
        }
        Update: {
          company_logo_url?: string | null
          company_name?: string
          created_at?: string
          display_order?: number | null
          experience_text?: string
          id?: string
          is_active?: boolean | null
          program_type?: Database["public"]["Enums"]["program_type"]
          student_image_url?: string | null
          student_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      success_videos: {
        Row: {
          company: string
          created_at: string
          department: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string
          video_url: string
        }
        Insert: {
          company: string
          created_at?: string
          department?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string
          video_url: string
        }
        Update: {
          company?: string
          created_at?: string
          department?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      who_we_are_images: {
        Row: {
          alt_text: string
          created_at: string
          display_order: number
          id: string
          image_url: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          alt_text: string
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          alt_text?: string
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_job_status: {
        Args: { deadline: string }
        Returns: Database["public"]["Enums"]["job_status"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      file_type_enum: "pdf" | "doc" | "docx" | "ppt" | "pptx" | "xls" | "xlsx"
      job_status: "open" | "upcoming" | "closed"
      modality_type: "onsite" | "hybrid" | "remote"
      program_type: "Co-op" | "Remote@AUI" | "Alternance" | "All Programs"
      resource_category_enum:
        | "presentations"
        | "student_guides"
        | "employer_guides"
        | "cv_interview_guides"
      service_category: "coop" | "remote" | "alternance" | "general"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      file_type_enum: ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx"],
      job_status: ["open", "upcoming", "closed"],
      modality_type: ["onsite", "hybrid", "remote"],
      program_type: ["Co-op", "Remote@AUI", "Alternance", "All Programs"],
      resource_category_enum: [
        "presentations",
        "student_guides",
        "employer_guides",
        "cv_interview_guides",
      ],
      service_category: ["coop", "remote", "alternance", "general"],
    },
  },
} as const
