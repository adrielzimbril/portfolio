import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
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
    }
  }
}