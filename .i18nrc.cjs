// This file is intentionally kept in CommonJS format (.cjs)
// to resolve compatibility issues with dependencies that require CommonJS.
// Do not convert this file to ESModule format unless all dependencies support it.
const { defineConfig } = require("@lobehub/i18n-cli");

const isMdx = false;

const mode = "content"; // "default" or "content"

module.exports = defineConfig({
  modelName: "gpt-4.1-nano",
  entry:
    mode === "default"
      ? "src/module/i18n/translations/fr.json"
      : "src/data/personal/translate",
  entryLocale: "fr",
  output:
    mode === "default"
      ? "src/module/i18n/translations"
      : "src/data/personal/translate",
  outputLocales: ["en", "zh_CN"],
  saveImmediately: true,
  splitToken: "1024",
  experimental: {
    jsonMode: true,
  },
  markdown: {
    entry: [isMdx ? "src/content/**/*.mdx" : "src/content/**/*.md"],
    entryLocale: "fr",
    entryExtension: isMdx ? ".mdx" : ".md",
    outputLocales: ["en", "zh_CN"],
    includeMatter: true,
    outputExtensions: (locale, { getDefaultExtension }) => {
      if (locale === "fr") return isMdx ? ".mdx" : ".md";
      return isMdx ? `.${locale}.mdx` : getDefaultExtension(locale);
    },
  },
});
