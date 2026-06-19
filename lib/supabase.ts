import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// FRONTEND CLIENT (untuk UI / dashboard)
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// BACKEND SECRET KEY (WAJIB untuk API / server)
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceRoleKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
}

// ADMIN CLIENT (untuk TikTok token save, server-side only)
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);