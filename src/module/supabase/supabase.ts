import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "placeholder-anon-key";

// Only throw error if we are missing real env vars in production/runtime
const isPlaceholder =
  supabaseUrl.includes("placeholder") ||
  supabaseAnonKey.includes("placeholder");

if (process.env.NODE_ENV !== 'development' && isPlaceholder) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: {
          id: string
          nom: string
          numero: string
          email?: string
          created_at: string
        }
        Insert: {
          id?: string
          nom: string
          numero: string
          email?: string
          created_at?: string
        }
        Update: {
          id?: string
          nom?: string
          numero?: string
          email?: string
          created_at?: string
        }
      }
      newsletter_stats: {
        Row: {
          id: string
          total_readers: number
          updated_at: string
        }
        Insert: {
          id?: string
          total_readers?: number
          updated_at?: string
        }
        Update: {
          id?: string
          total_readers?: number
          updated_at?: string
        }
      }
      page_views: {
        Row: {
          path: string
          count: number
          updated_at: string
        }
        Insert: {
          path: string
          count?: number
          updated_at?: string
        }
        Update: {
          path?: string
          count?: number
          updated_at?: string
        }
      }
    }
  }
}