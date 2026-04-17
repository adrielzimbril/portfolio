"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { ConfigValue } from "@/config";

interface AdminAuthGuardProps {
  user: User | null;
  children: React.ReactNode;
}

export function AdminAuthGuard({ user, children }: AdminAuthGuardProps) {
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    const userEmail = user.email;
    const adminEmails = ConfigValue.NEXT_PRIVATE_ADMIN_EMAILS?.split(",") || [];

    if (!userEmail || !adminEmails.includes(userEmail)) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const userEmail = user.email;
  const adminEmails = ConfigValue.NEXT_PRIVATE_ADMIN_EMAILS?.split(",") || [];

  if (!userEmail || !adminEmails.includes(userEmail)) {
    return null;
  }

  return <>{children}</>;
}
