import { createBrowserClient } from "@supabase/ssr";
import logger from "@/utils/logger";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

logger.info("Supabase environment variables:", {
  supabaseUrl,
  supabaseAnonKey,
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
