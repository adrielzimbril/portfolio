import { createServerClient } from "@supabase/ssr";
import { Database } from "@/integrations/supabase/types";
import { supabaseKey } from "@/integrations/supabase/client";

export const createClient = (cookieStore: any) => {
  return createServerClient<Database>(supabaseKey.url!, supabaseKey.anonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
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

export const createAdminClient = () => {
  if (!supabaseKey.serviceRoleKey) {
    throw new Error("Missing Supabase Service Role Key environment variable");
  }
  return createServerClient<Database>(
    supabaseKey.url!,
    supabaseKey.serviceRoleKey,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // No-op for admin client
        },
      },
    },
  );
};
