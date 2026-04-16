import { getLocale, getTranslations } from "next-intl/server";
import {
  getQuestBySlug,
  isRegistrationClosed,
} from "@/integrations/content/lib/quests";
import { IntentionForm } from "@/app/(base)/quests/[slug]/register/sections/IntentionForm";
import { HeaderSection } from "@/app/(base)/quests/[slug]/register/sections/HeaderSection";
import { getImageUrl, getResourcesUrl } from "@/utils/base-url";
import { PageParams, PageType } from "@/types";
import { ChallengeClosedState } from "@/components/shared/pages/quests/challenge-closed-state";
import { metadata as baseMetadata } from "@/app/metadata";
import { Metadata } from "next";
import { localeRedirect } from "@/integrations/i18n/routing";
import { routes } from "@/data/routes";

export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const t = await getTranslations();
  const locale = await getLocale();
  const quest = await getQuestBySlug(slug, { locale });

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("quests.register.title"),
    description: t("quests.register.description"),
    keywords: t("quests.register.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("quests.register.title"),
      description: t("quests.register.description"),
      images: [getImageUrl(quest?.cover ?? "opengraph-image.png")],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("quests.register.title"),
      description: t("quests.register.description"),
      images: [getImageUrl(quest?.cover ?? "opengraph-image.png")],
    },
  };

  return metadata;
}
export default async function QuestRegisterPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ admin_access?: string }>;
}) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const adminAccess = searchParams?.admin_access;
  const locale = await getLocale();
  const t = await getTranslations();
  const quest = await getQuestBySlug(slug, { locale });

  if (!quest) {
    return localeRedirect({ href: routes.quests.link, locale });
  }

  const isAdminBypass = adminAccess === "nobo_duy";
  const closed = isAdminBypass
    ? false
    : isRegistrationClosed(quest.registration_deadline);

  return (
    <>
      <HeaderSection
        title={quest.title}
        actionButton={true}
        buttonLink={getResourcesUrl(PageType.QUESTS, slug)}
        buttonText={t("quests.register.closed.actionLabel")}
      />
      {closed ? (
        <ChallengeClosedState
          badge={t("quests.register.closed.badge")}
          title={t("quests.register.closed.title")}
          description={t("quests.register.closed.description")}
          href={getResourcesUrl(PageType.QUESTS, slug)}
          actionLabel={t("quests.register.closed.actionLabel")}
        />
      ) : (
        <IntentionForm questSlug={slug} />
      )}
    </>
  );
}
