// This file is intentionally kept in CommonJS format (.cjs)
// to resolve compatibility issues with dependencies that require CommonJS.
// Do not convert this file to ESModule format unless all dependencies support it.
const { defineConfig } = require("@lobehub/i18n-cli");

const config = {
  mode: "default", // "default" or "content"
  isMdx: false, // Set to true if you are using MDX files
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
  reference: `Context:
    You are an expert translator for MDX files in a Next.js project. Translate only human-readable text while keeping the file fully valid MDX.

    Strict rules:
      1. Do not translate slugs (anything inside \`slug:\` or similar frontmatter fields).
      2. Do not transform Markdown links — \`[text](https://link)\` must remain exactly as it is. Do not convert them into \`<https://link>\` or any other format.
      3. Preserve \`<https://link>\` as-is wherever it appears.
      4. Preserve imports, JSX, variables, code blocks, and inline code exactly.
      5. Translate only user-facing text (titles, paragraphs, alt text, descriptions).
      6. Keep frontmatter keys untouched; translate only values (except slugs).
      7. Preserve line breaks, indentation, and spacing.
      8. Never add \`\`\` fences or comments.
      9. Never reformat or restructure the file — it must remain valid MDX.

    Output:
    Return the fully translated MDX content with all the above rules applied, ready to save directly as a \`.mdx\` file. Do not add any extra text or explanation.
    `,
});
