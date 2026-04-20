"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { SidebarOverlay } from "./sidebar-overlay";
import type { AdminUser } from "../admin-types";
import { apiRoutes } from "@/data/api-routes";
import { landlordRoutes } from "@/data/landlordRoutes";

export function DashboardLayout({
  user,
  children,
}: {
  user: AdminUser;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const response = await fetch(apiRoutes.auth.logout.link, { method: "POST" });
      if (response.ok) {
        router.push(landlordRoutes.login.link);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-[#f4f3ec] p-3 text-[#11191f] md:p-6">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onSignOut={handleSignOut}
      />
      <SidebarOverlay
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden md:pl-6">
        <Header
          user={user}
          setSidebarOpen={setSidebarOpen}
          onRefresh={handleRefresh}
        />
        <section className="min-h-0 flex-1 overflow-y-auto rounded-[30px] border border-black/8 bg-[#fbfaf6] p-4 md:p-6 pb-20 md:pb-6 relative z-10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
          {children}
        </section>
      </main>
    </div>
  );
}
