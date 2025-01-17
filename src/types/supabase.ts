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
      schedules: {
        Row: {
          id: string
          date: string
          period: number
          duration: number
          subject: string
          teacher: string
          room: string | null
          department: 'day' | 'night'
          class: 'A' | 'B' | 'N'
          year: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date: string
          period: number
          duration: number
          subject: string
          teacher: string
          room?: string | null
          department: 'day' | 'night'
          class: 'A' | 'B' | 'N'
          year: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          period?: number
          duration?: number
          subject?: string
          teacher?: string
          room?: string | null
          department?: 'day' | 'night'
          class?: 'A' | 'B' | 'N'
          year?: number
          created_at?: string
          updated_at?: string
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