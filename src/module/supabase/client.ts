import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/module/supabase/types";

export const supabaseKey = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
};

if (!supabaseKey.url || !supabaseKey.anonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createBrowserClient<Database>(
  supabaseKey.url,
  supabaseKey.anonKey
);
