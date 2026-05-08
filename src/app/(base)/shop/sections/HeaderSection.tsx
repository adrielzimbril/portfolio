import { SectionHeader } from "@/components/shared/sections/header";
import { useTranslations } from "use-intl";

export function HeaderSection() {
  const t = useTranslations();

  return (
    <SectionHeader
      title={t("shop.page.header-section.title")}
      description={t("shop.page.header-section.description")}
      badge={t("shop.page.header-section.badge")}
    />
  );
}
