"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { ConfigValue } from "@/config";
import { logger } from "@/utils/logger";

interface AdminAuthGuardProps {
  user: User | null;
  children: React.ReactNode;
}

export function AdminAuthGuard({ user, children }: AdminAuthGuardProps) {
  const router = useRouter();

  React.useEffect(() => {
    logger.debug("[AdminAuthGuard] Checking authentication...", {
      userId: user?.id,
      userEmail: user?.email,
    });

    if (!user) {
      logger.info("[AdminAuthGuard] No user found, redirecting to home");
      router.push("/");
      return;
    }

    const userEmail = user.email;
    const adminEmails = ConfigValue.NEXT_PRIVATE_ADMIN_EMAILS?.split(",") || [];

    logger.debug("[AdminAuthGuard] Checking admin authorization", {
      userEmail,
      adminEmails,
    });

    if (!userEmail || !adminEmails.includes(userEmail)) {
      logger.warn("[AdminAuthGuard] User not authorized, redirecting to home", {
        userEmail,
        isAdmin: adminEmails.includes(userEmail || ""),
      });
      router.push("/");
    } else {
      logger.success("[AdminAuthGuard] User authorized successfully");
    }
  }, [user, router]);

  if (!user) {
    logger.info("[AdminAuthGuard] Render: No user, returning null");
    return null;
  }

  const userEmail = user.email;
  const adminEmails = ConfigValue.NEXT_PRIVATE_ADMIN_EMAILS?.split(",") || [];

  logger.debug("[AdminAuthGuard] Render: Checking authorization", {
    userEmail,
    adminEmails,
  });

  if (!userEmail || !adminEmails.includes(userEmail)) {
    logger.warn("[AdminAuthGuard] Render: User not authorized, returning null");
    return null;
  }

  logger.success(
    "[AdminAuthGuard] Render: User authorized, rendering children",
  );
  return <>{children}</>;
}
