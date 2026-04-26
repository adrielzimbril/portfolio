import type { Legal } from "@/integrations/content/types/types";
import { allLegals } from "content-collections";

type GetAllLegalOptions = {
  locale?: string;
};

export async function getAllLegal(
  options: Partial<GetAllLegalOptions> = {},
): Promise<Legal[]> {
  const { locale } = {
    locale: undefined,
    ...options,
  };
  return Promise.resolve(
    allLegals.filter((entry) => !locale || entry.locale === locale),
  );
}

export async function getLegalByPath(
  path: string,
  options?: {
    locale?: string;
  },
): Promise<Legal | null> {
  const { locale } = options ?? {};

  return Promise.resolve(
    allLegals.find(
      (entry: Legal) =>
        entry.path === path && (!locale || entry.locale === locale),
    ) ?? null,
  );
}
