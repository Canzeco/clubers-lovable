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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bots: {
        Row: {
          created_at: string
          found: number
          goal: number
          icon: string
          id: string
          last_event: string | null
          name: string
          position: number
          region: string
          role: string
          status: string
          uses: string[]
        }
        Insert: {
          created_at?: string
          found?: number
          goal?: number
          icon: string
          id?: string
          last_event?: string | null
          name: string
          position?: number
          region: string
          role: string
          status: string
          uses?: string[]
        }
        Update: {
          created_at?: string
          found?: number
          goal?: number
          icon?: string
          id?: string
          last_event?: string | null
          name?: string
          position?: number
          region?: string
          role?: string
          status?: string
          uses?: string[]
        }
        Relationships: []
      }
      communities: {
        Row: {
          city: string
          color: string
          created_at: string
          email_domain: string
          id: string
          label: string
          position: number
          short: string
        }
        Insert: {
          city: string
          color: string
          created_at?: string
          email_domain: string
          id: string
          label: string
          position?: number
          short: string
        }
        Update: {
          city?: string
          color?: string
          created_at?: string
          email_domain?: string
          id?: string
          label?: string
          position?: number
          short?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          id: string
          position: number
          question: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          position?: number
          question: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          position?: number
          question?: string
        }
        Relationships: []
      }
      integrations: {
        Row: {
          category: string
          created_at: string
          group_name: string
          id: string
          link: string | null
          monthly: string | null
          name: string
          position: number
          purpose: string
          status: string
          usage: string | null
        }
        Insert: {
          category: string
          created_at?: string
          group_name: string
          id?: string
          link?: string | null
          monthly?: string | null
          name: string
          position?: number
          purpose: string
          status: string
          usage?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          group_name?: string
          id?: string
          link?: string | null
          monthly?: string | null
          name?: string
          position?: number
          purpose?: string
          status?: string
          usage?: string | null
        }
        Relationships: []
      }
      pipeline_stages: {
        Row: {
          color: string | null
          count: number
          created_at: string
          hint: string | null
          id: string
          label: string
          position: number
          stage_id: string
        }
        Insert: {
          color?: string | null
          count?: number
          created_at?: string
          hint?: string | null
          id?: string
          label: string
          position?: number
          stage_id: string
        }
        Update: {
          color?: string | null
          count?: number
          created_at?: string
          hint?: string | null
          id?: string
          label?: string
          position?: number
          stage_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          country: string | null
          created_at: string
          id: string
          instagram: string | null
          name: string | null
          onboarded: boolean
          phone: string | null
          sex: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          country?: string | null
          created_at?: string
          id?: string
          instagram?: string | null
          name?: string | null
          onboarded?: boolean
          phone?: string | null
          sex?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          country?: string | null
          created_at?: string
          id?: string
          instagram?: string | null
          name?: string | null
          onboarded?: boolean
          phone?: string | null
          sex?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sourcing_feed: {
        Row: {
          bot: string
          created_at: string
          id: string
          kind: string
          msg: string
          position: number
          t: string
        }
        Insert: {
          bot: string
          created_at?: string
          id?: string
          kind: string
          msg: string
          position?: number
          t: string
        }
        Update: {
          bot?: string
          created_at?: string
          id?: string
          kind?: string
          msg?: string
          position?: number
          t?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      venues: {
        Row: {
          area: string | null
          city: string | null
          country: string | null
          created_at: string
          details: Json | null
          emoji: string | null
          fit: string | null
          gmv_month: string | null
          health: number | null
          id: string
          image_url: string | null
          instagram: string | null
          is_unit: boolean
          last_touch: string | null
          name: string
          owner: string | null
          plan: string | null
          position: number | null
          rating: number | null
          redeems: number | null
          signals: string[] | null
          slug: string | null
          stage: string | null
          status: string | null
          ticket: string | null
          type: string | null
        }
        Insert: {
          area?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          details?: Json | null
          emoji?: string | null
          fit?: string | null
          gmv_month?: string | null
          health?: number | null
          id?: string
          image_url?: string | null
          instagram?: string | null
          is_unit?: boolean
          last_touch?: string | null
          name: string
          owner?: string | null
          plan?: string | null
          position?: number | null
          rating?: number | null
          redeems?: number | null
          signals?: string[] | null
          slug?: string | null
          stage?: string | null
          status?: string | null
          ticket?: string | null
          type?: string | null
        }
        Update: {
          area?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          details?: Json | null
          emoji?: string | null
          fit?: string | null
          gmv_month?: string | null
          health?: number | null
          id?: string
          image_url?: string | null
          instagram?: string | null
          is_unit?: boolean
          last_touch?: string | null
          name?: string
          owner?: string | null
          plan?: string | null
          position?: number | null
          rating?: number | null
          redeems?: number | null
          signals?: string[] | null
          slug?: string | null
          stage?: string | null
          status?: string | null
          ticket?: string | null
          type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
