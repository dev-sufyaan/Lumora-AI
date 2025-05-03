export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          date: string
          time: string
          topic: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          date: string
          time: string
          topic: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          date?: string
          time?: string
          topic?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
