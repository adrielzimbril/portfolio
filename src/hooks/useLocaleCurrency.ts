import { useLocale } from "next-intl";
import { appConfig } from "@/data/config";

export function useLocaleCurrency() {
	const locale = useLocale();
	const localeCurrency =
		Object.entries(appConfig.i18n.locales).find(([key]) => key === locale)?.[1]
			.currency ?? appConfig.i18n.defaultCurrency;

	return localeCurrency;
}
