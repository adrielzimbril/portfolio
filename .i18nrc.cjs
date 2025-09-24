// This file is intentionally kept in CommonJS format (.cjs)
// to resolve compatibility issues with dependencies that require CommonJS.
// Do not convert this file to ESModule format unless all dependencies support it.
const { defineConfig } = require("@lobehub/i18n-cli");

module.exports = defineConfig({
  modelName: "gpt-4.1-nano",
  entry: "src/module/i18n/translations/fr.json",
  entryLocale: "fr",
  output: "src/module/i18n/translations",
  outputLocales: ["en", "zh_CN"],
  saveImmediately: true,
  splitToken: "1024",
  experimental: {
    jsonMode: true,
  },
  markdown: {
    entry: ["src/content/**/*.mdx"],
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
