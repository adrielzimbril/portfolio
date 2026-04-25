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
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      challenge_registrations: {
        Row: {
          challenge_slug: string
          created_at: string
          email: string
          id: string
          ip: string | null
          message: string | null
          meta: Json | null
          name: string
          user_id: string | null
        }
        Insert: {
          challenge_slug: string
          created_at?: string
          email: string
          id?: string
          ip?: string | null
          message?: string | null
          meta?: Json | null
          name: string
          user_id?: string | null
        }
        Update: {
          challenge_slug?: string
          created_at?: string
          email?: string
          id?: string
          ip?: string | null
          message?: string | null
          meta?: Json | null
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_submissions: {
        Row: {
          challenge_slug: string
          created_at: string
          email: string
          id: string
          ip: string | null
          is_public: boolean
          message: string | null
          meta: Json | null
          name: string
          status: string
          user_id: string | null
          work_url: string
        }
        Insert: {
          challenge_slug: string
          created_at?: string
          email: string
          id?: string
          ip?: string | null
          is_public?: boolean
          message?: string | null
          meta?: Json | null
          name: string
          status?: string
          user_id?: string | null
          work_url: string
        }
        Update: {
          challenge_slug?: string
          created_at?: string
          email?: string
          id?: string
          ip?: string | null
          is_public?: boolean
          message?: string | null
          meta?: Json | null
          name?: string
          status?: string
          user_id?: string | null
          work_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      community_wall: {
        Row: {
          created_at: string
          creator_avatar_url: string | null
          creator_name: string
          id: string
          message: Json | null
          pattern_index: number | null
          rotation: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          creator_avatar_url?: string | null
          creator_name: string
          id?: string
          message?: Json | null
          pattern_index?: number | null
          rotation?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          creator_avatar_url?: string | null
          creator_name?: string
          id?: string
          message?: Json | null
          pattern_index?: number | null
          rotation?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      hub_product_links: {
        Row: {
          created_at: string | null
          private_url: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          private_url: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          private_url?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      hub_product_requests: {
        Row: {
          cover_image: string | null
          created_at: string
          custom_text: string | null
          features: string[] | null
          id: string
          product_id: string | null
          product_title: string
          product_type: string | null
          product_url: string | null
          requested_at: string
          subscribed_from_page: string | null
          user_id: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          custom_text?: string | null
          features?: string[] | null
          id?: string
          product_id?: string | null
          product_title: string
          product_type?: string | null
          product_url?: string | null
          requested_at?: string
          subscribed_from_page?: string | null
          user_id: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          custom_text?: string | null
          features?: string[] | null
          id?: string
          product_id?: string | null
          product_title?: string
          product_type?: string | null
          product_url?: string | null
          requested_at?: string
          subscribed_from_page?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hub_product_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          id: string
          subscribed_from_page: string | null
          updateexisting: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          subscribed_from_page?: string | null
          updateexisting?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          subscribed_from_page?: string | null
          updateexisting?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_subscribers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      page_counters: {
        Row: {
          created_at: string | null
          id: number
          slug: string
          total_views: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          slug: string
          total_views?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          slug?: string
          total_views?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      page_views: {
        Row: {
          count: number
          details: Json | null
          ip: string
          path: string
          slug: string
          type: string
          updated_at: string
        }
        Insert: {
          count?: number
          details?: Json | null
          ip?: string
          path: string
          slug?: string
          type?: string
          updated_at?: string
        }
        Update: {
          count?: number
          details?: Json | null
          ip?: string
          path?: string
          slug?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      reactions: {
        Row: {
          anonymous_id: string | null
          created_at: string
          entity_id: string
          id: string
          migrated_from_anonymous: string | null
          page_type: string
          reaction_type: string
          user_id: string | null
        }
        Insert: {
          anonymous_id?: string | null
          created_at?: string
          entity_id: string
          id?: string
          migrated_from_anonymous?: string | null
          page_type: string
          reaction_type: string
          user_id?: string | null
        }
        Update: {
          anonymous_id?: string | null
          created_at?: string
          entity_id?: string
          id?: string
          migrated_from_anonymous?: string | null
          page_type?: string
          reaction_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      submit_entries: {
        Row: {
          created_at: string
          description: string | null
          email: string
          id: string
          intention: string
          ip: string | null
          meta: Json | null
          name: string
          status: string
          target: string | null
          url: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          email: string
          id?: string
          intention: string
          ip?: string | null
          meta?: Json | null
          name: string
          status?: string
          target?: string | null
          url: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          intention?: string
          ip?: string | null
          meta?: Json | null
          name?: string
          status?: string
          target?: string | null
          url?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      unique_views: {
        Row: {
          details: Json | null
          first_view_at: string | null
          id: number
          last_view_at: string | null
          slug: string
          type: string
          user_ip: string
          view_count: number | null
        }
        Insert: {
          details?: Json | null
          first_view_at?: string | null
          id?: number
          last_view_at?: string | null
          slug: string
          type: string
          user_ip: string
          view_count?: number | null
        }
        Update: {
          details?: Json | null
          first_view_at?: string | null
          id?: number
          last_view_at?: string | null
          slug?: string
          type?: string
          user_ip?: string
          view_count?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      hub_product_requests_with_user: {
        Row: {
          cover_image: string | null
          created_at: string | null
          custom_text: string | null
          email: string | null
          features: string[] | null
          id: string | null
          name: string | null
          phone: string | null
          product_title: string | null
          product_type: string | null
          product_url: string | null
          subscribed_from_page: string | null
          user_created_at: string | null
          user_id: string | null
          user_updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hub_product_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers_with_user: {
        Row: {
          created_at: string | null
          email: string | null
          id: string | null
          name: string | null
          phone: string | null
          subscribed_from_page: string | null
          user_created_at: string | null
          user_id: string | null
          user_updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_subscribers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      add_hub_product_request: {
        Args: {
          p_cover?: string
          p_custom_text?: string
          p_email?: string
          p_features?: string[]
          p_name?: string
          p_phone?: string
          p_product_id?: string
          p_product_title?: string
          p_product_type?: string
          p_product_url?: string
          p_subscribed_from_page?: string
          p_user_id?: string
        }
        Returns: {
          id: number
          user_id: string
        }[]
      }
      add_newsletter_subscriber: {
        Args: {
          p_email?: string
          p_name?: string
          p_phone?: string
          p_subscribed_from_page?: string
          p_user_id?: string
        }
        Returns: {
          id: number
          user_id: string
        }[]
      }
      create_newsletter_subscription: {
        Args: {
          p_email: string
          p_name?: string
          p_subscribed_from_page?: string
        }
        Returns: string
      }
      create_product_request: {
        Args: {
          p_cover?: string
          p_custom_text?: string
          p_email: string
          p_features?: string
          p_name?: string
          p_phone?: string
          p_product_title?: string
          p_product_type?: string
          p_product_url?: string
          p_subscribed_from_page?: string
        }
        Returns: string
      }
      get_or_create_user: {
        Args: { p_email: string; p_name: string; p_phone: string }
        Returns: string
      }
      get_page_analytics:
        | {
            Args: { p_path: string; p_slug?: string; p_type: string }
            Returns: {
              total_views: number
              unique_users: number
            }[]
          }
        | {
            Args: { p_slug: string; p_type: string }
            Returns: {
              total_views: number
              unique_users: number
            }[]
          }
      increment_page_analytics:
        | {
            Args: {
              p_details?: Json
              p_path: string
              p_slug?: string
              p_type: string
              p_user_ip?: string
            }
            Returns: {
              is_new_unique_user: boolean
              total_views: number
              unique_users: number
              user_view_count: number
            }[]
          }
        | {
            Args: {
              p_details?: Json
              p_path: string
              p_slug?: string
              p_timestamp?: string
              p_type: string
              p_user_ip?: string
            }
            Returns: {
              is_new_unique_user: boolean
              total_views: number
              unique_users: number
            }[]
          }
        | {
            Args: {
              p_details?: Json
              p_slug: string
              p_timestamp?: string
              p_type: string
              p_user_ip?: string
            }
            Returns: {
              is_new_unique_user: boolean
              total_views: number
              unique_users: number
            }[]
          }
      link_hub_request_to_user: {
        Args: { p_request_id: string; p_user_id: string }
        Returns: undefined
      }
      link_newsletter_to_user: {
        Args: { p_newsletter_id: string; p_user_id: string }
        Returns: undefined
      }
      merge_users: {
        Args: { p_source: string; p_target: string }
        Returns: undefined
      }
      sync_anonymous_reactions: {
        Args: { p_anonymous_id: string; p_user_id: string }
        Returns: number
      }
      sync_anonymous_reactions_rpc: {
        Args: { p_anonymous_id: string }
        Returns: number
      }
      upsert_page_counter: {
        Args: {
          p_increment?: number
          p_path: string
          p_slug?: string
          p_type: string
        }
        Returns: number
      }
      upsert_unique_view: {
        Args: {
          p_details?: Json
          p_path: string
          p_slug?: string
          p_type: string
          p_user_ip: string
        }
        Returns: {
          is_new_user: boolean
          view_count: number
        }[]
      }
      upsert_user: {
        Args: { p_email: string; p_name: string; p_phone: string }
        Returns: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "users"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      [_ in never]: never
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
