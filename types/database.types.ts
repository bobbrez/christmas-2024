export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      answers: {
        Row: {
          created_at: string | null
          round_id: number
          user_id: string
          value: Json
        }
        Insert: {
          created_at?: string | null
          round_id: number
          user_id: string
          value?: Json
        }
        Update: {
          created_at?: string | null
          round_id?: number
          user_id?: string
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "answers_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      bets: {
        Row: {
          amount: number
          created_at: string
          id: string
          round_id: number | null
          status: Database["public"]["Enums"]["bet_status"]
          subject_id: string | null
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          round_id?: number | null
          status?: Database["public"]["Enums"]["bet_status"]
          subject_id?: string | null
          user_id?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          round_id?: number | null
          status?: Database["public"]["Enums"]["bet_status"]
          subject_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bets_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          last_name: string | null
          user_id: string
        }
        Insert: {
          first_name?: string | null
          last_name?: string | null
          user_id: string
        }
        Update: {
          first_name?: string | null
          last_name?: string | null
          user_id?: string
        }
        Relationships: []
      }
      rounds: {
        Row: {
          created_at: string | null
          id: number
          players: string[]
          question: string | null
          status: Database["public"]["Enums"]["round_status"]
          title: string | null
          winner_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          players?: string[]
          question?: string | null
          status?: Database["public"]["Enums"]["round_status"]
          title?: string | null
          winner_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          players?: string[]
          question?: string | null
          status?: Database["public"]["Enums"]["round_status"]
          title?: string | null
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rounds_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      bets_resolved: {
        Row: {
          total_balance: number | null
          total_lost: number | null
          total_won: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      upsert_answer: {
        Args: {
          round_id: number
          user_id: string
          new_value: Json
        }
        Returns: Json
      }
      upsert_bet: {
        Args: {
          round_id: number
          user_id: string
          bet_amount: number
          subject_id: string
        }
        Returns: number
      }
    }
    Enums: {
      bet_status: "open" | "pending" | "won" | "lost"
      round_status: "pending" | "bets_open" | "bets_closed" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
