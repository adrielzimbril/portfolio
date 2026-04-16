import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/integrations/supabase/types";
import { ConfigValue } from "@/config";

export const supabaseKey = {
  url: ConfigValue.NEXT_PUBLIC_SUPABASE_URL ?? "",
  anonKey: ConfigValue.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
};

if (!supabaseKey.url) {
  throw new Error("Missing Supabase URL environment variable");
}

if (!supabaseKey.anonKey) {
  throw new Error("Missing Supabase Anon Key environment variable");
}

export const supabase = createBrowserClient<Database>(
  supabaseKey.url,
  supabaseKey.anonKey,
);
