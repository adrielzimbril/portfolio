import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();

  redirect("/");
}
