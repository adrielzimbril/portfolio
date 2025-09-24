// This file is intentionally kept in CommonJS format (.cjs)
// to resolve compatibility issues with dependencies that require CommonJS.
// Do not convert this file to ESModule format unless all dependencies support it.
const { defineConfig } = require("@lobehub/i18n-cli");

const config = {
  mode: "default", // "default" or "content"
  isMdx: true, // Set to true if you are using MDX files
};

module.exports = defineConfig({
  modelName: "gpt-4.1",
  entry:
    config.mode === "default"
      ? "src/module/i18n/translations/fr.json"
      : "src/data/personal/translate",
  entryLocale: "fr",
  output:
    config.mode === "default"
      ? "src/module/i18n/translations"
      : "src/data/personal/translate",
  outputLocales: ["en", "zh-CN"],
  saveImmediately: true,
  //splitToken: "4096",
  experimental: {
    jsonMode: true,
  },
  markdown: {
    entry: [config.isMdx ? "src/content/**/*.mdx" : "src/content/**/*.md"],
    entryLocale: "fr",
    entryExtension: config.isMdx ? ".mdx" : ".md",
    outputLocales: ["en", "zh-CN"],
    includeMatter: true,
    outputExtensions: (locale, { getDefaultExtension }) => {
      if (locale === "fr") return config.isMdx ? ".mdx" : ".md";
      return config.isMdx ? `.${locale}.mdx` : getDefaultExtension(locale);
    },
  },
});
