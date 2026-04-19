"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestsManagementSection } from "@/app/(base)/landlord/sections/QuestsManagementSection";
import { CommunityWallManagementSection } from "@/app/(base)/landlord/sections/CommunityWallManagementSection";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("quests");
  const t = useTranslations();

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quests">{t("admin.landlord.tabs.quests")}</TabsTrigger>
          <TabsTrigger value="community">{t("admin.landlord.tabs.community")}</TabsTrigger>
        </TabsList>
        <TabsContent value="quests" className="mt-6">
          <QuestsManagementSection />
        </TabsContent>
        <TabsContent value="community" className="mt-6">
          <CommunityWallManagementSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
