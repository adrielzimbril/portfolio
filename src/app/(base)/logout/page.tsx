"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { apiRoutes } from "@/data/api-routes";
import { clearSyncCookie } from "@/lib/reactions/anonymous-user";

export default function LogoutPage() {
  useEffect(() => {
    const logout = async () => {
      const res = await fetch(apiRoutes.auth.logout.link, { method: "POST" });

      if (res.ok) {
        clearSyncCookie();
        redirect("/");
      }
    };
    logout();
  }, []);

  return null;
}
