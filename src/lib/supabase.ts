import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const normalizedSupabaseUrl = supabaseUrl
  ?.replace(/\/rest\/v1\/?$/, "")
  .replace(/\/$/, "");

export const hasSupabaseConfig = Boolean(
  normalizedSupabaseUrl && supabaseAnonKey,
);

export const supabase = hasSupabaseConfig
  ? createClient(normalizedSupabaseUrl, supabaseAnonKey)
  : null;
