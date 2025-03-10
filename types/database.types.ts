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
      dog: {
        Row: {
          birth_date: string | null
          created_at: string
          id: number
          name: string
        }
        Insert: {
          birth_date?: string | null
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          birth_date?: string | null
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      dog_access: {
        Row: {
          created_at: string
          dog_id: number
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          dog_id: number
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          dog_id?: number
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dog_access_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dog_access_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      dog_excretions: {
        Row: {
          created_at: string
          date: string
          dog_id: number
          handler_id: string
          id: number
          location: Database["public"]["Enums"]["dog_excretions_location"]
          notes: string | null
          type: Database["public"]["Enums"]["dog_excretions_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          date?: string
          dog_id: number
          handler_id?: string
          id?: number
          location: Database["public"]["Enums"]["dog_excretions_location"]
          notes?: string | null
          type: Database["public"]["Enums"]["dog_excretions_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          dog_id?: number
          handler_id?: string
          id?: number
          location?: Database["public"]["Enums"]["dog_excretions_location"]
          notes?: string | null
          type?: Database["public"]["Enums"]["dog_excretions_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dog_excretions_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dog_excretions_handler_id_fkey"
            columns: ["handler_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      graph_view: {
        Row: {
          count: number | null
          date: string | null
          dog_id: number | null
          location:
            | Database["public"]["Enums"]["dog_excretions_location"]
            | null
          type: Database["public"]["Enums"]["dog_excretions_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "dog_excretions_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dog"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          avatar_url: string | null
          email: string | null
          id: string | null
          name: string | null
        }
        Insert: {
          avatar_url?: never
          email?: never
          id?: string | null
          name?: never
        }
        Update: {
          avatar_url?: never
          email?: never
          id?: string | null
          name?: never
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      dog_excretions_location: "indoors" | "outdoors"
      dog_excretions_type: "pee" | "poop"
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
