import { useParseMarkdown } from "@/hooks/useParseMarkdown";

function FormattedText({
  children,
  useMarkdown = false,
}: {
  children?: string;
  useMarkdown?: boolean;
}) {
  const parseMarkdown = useParseMarkdown;
  if (!children) return null;

  const htmlContent = useMarkdown ? parseMarkdown(children) : children;
  return <p dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export { FormattedText };
