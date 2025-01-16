export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          company: string | null;
          subscription_status: string | null;
          subscription_plan: string | null;
          card_last4: string | null;
          next_billing_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          email?: string | null;
          company?: string | null;
          subscription_status?: string | null;
          subscription_plan?: string | null;
          card_last4?: string | null;
          next_billing_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string | null;
          company?: string | null;
          subscription_status?: string | null;
          subscription_plan?: string | null;
          card_last4?: string | null;
          next_billing_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          owner_id: string;
          title: string;
          address: string;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          title: string;
          address: string;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          title?: string;
          address?: string;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      units: {
        Row: {
          id: string;
          property_id: string;
          unit_number: string;
          monthly_rent: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          unit_number: string;
          monthly_rent: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          unit_number?: string;
          monthly_rent?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tenants: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          email: string;
          phone: string | null;
          status: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          email: string;
          phone?: string | null;
          status?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          status?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      leases: {
        Row: {
          id: string;
          unit_id: string;
          tenant_id: string;
          start_date: string;
          end_date: string;
          monthly_rent: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          unit_id: string;
          tenant_id: string;
          start_date: string;
          end_date: string;
          monthly_rent: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          unit_id?: string;
          tenant_id?: string;
          start_date?: string;
          end_date?: string;
          monthly_rent?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      maintenance_requests: {
        Row: {
          id: string;
          unit_id: string;
          title: string;
          description: string | null;
          priority: string;
          status: string;
          submitted_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          unit_id: string;
          title: string;
          description?: string | null;
          priority?: string;
          status?: string;
          submitted_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          unit_id?: string;
          title?: string;
          description?: string | null;
          priority?: string;
          status?: string;
          submitted_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
