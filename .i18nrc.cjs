const { defineConfig } = require("@aurthle/i18n-cli");

module.exports = defineConfig({
  entry: "src/module/i18n/translations/fr.json",
  entryLocale: "fr",
  output: "src/module/i18n/translations/translations",
  outputLocales: ["en", "zh_CN"],
  markdown: {
    entry: ["src/content/**/*.md", "src/content/**/*.mdx"],
    entryLocale: "fr",
    entryExtension: ".mdx",
    outputLocales: ["en", "zh_CN"],
    includeMatter: true,
    outputExtensions: (locale, { getDefaultExtension }) => {
      if (locale === "fr") return ".mdx";
      return getDefaultExtension(locale);
    },
  },
});
