import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/module/supabase/types";
import { supabaseKey } from "@/module/supabase/client";

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient<Database>(supabaseKey.url, supabaseKey.anonKey, {
    cookies: {
      getAll() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (cookieStore as unknown as any).getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (cookieStore as unknown as any).set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};
