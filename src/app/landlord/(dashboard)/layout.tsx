import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isUserAuthenticatedServer } from "@/lib/reactions/anonymous-user";
import { createClient } from "@/integrations/supabase/server";
import { ConfigValue } from "@/config";
import { landlordRoutes } from "@/data/landlordRoutes";
import { logger } from "@/utils";
import { DashboardLayout } from "@/components/landlord/components/_layouts/dashboard-layout";

export default async function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await isUserAuthenticatedServer();

  if (!isAuthenticated) {
    redirect(landlordRoutes.login.link);
  }

  let user = null;
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser();
    user = supabaseUser;
  } catch (error) {
    logger.error("[DashboardLayoutWrapper] Failed to fetch user data", error);
  }

  const adminEmails = ConfigValue.NEXT_PRIVATE_ADMIN_EMAILS?.split(",") || [];
  const userEmail = user?.email;

  if (!user || !userEmail || !adminEmails.includes(userEmail)) {
    redirect(`${landlordRoutes.login.link}?reason=unauthorized`);
  }

  return (
    <div className="relative size-full min-h-dvh flex flex-col">
      <DashboardLayout
        user={{
          email: userEmail,
          name:
            user.user_metadata?.name ||
            user.user_metadata?.full_name ||
            userEmail.split("@")[0],
          avatarUrl: user.user_metadata?.avatar_url,
        }}
      >
        {children}
      </DashboardLayout>
    </div>
  );
}
