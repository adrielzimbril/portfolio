// Utility function to convert basic markdown to HTML
function useParseMarkdown(text: string): string {
  return (
    text
      // Nettoyer les retours à la ligne au début et à la fin
      .trim()
      // Bold **text** or __text__
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.*?)__/g, "<strong>$1</strong>")
      // Italic *text* or _text_
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      // Link [text](url)
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline">$1</a>'
      )
      // Code inline `code`
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>'
      )
      // Line break double for paragraphs (seulement au milieu du texte)
      .replace(/(?<!^)\n\n(?!$)/g, "<br/><br/>")
      // Line break simple (seulement au milieu du texte)
      .replace(/(?<!^)\n(?!$)/g, "<br/>")
  );
}

export { useParseMarkdown };
