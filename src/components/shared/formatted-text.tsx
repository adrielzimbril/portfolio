import { useParseMarkdown } from "@/hooks/useParseMarkdown";

function FormattedText({
  children,
  useMarkdown = false,
  className,
}: {
  children?: string;
  useMarkdown?: boolean;
  className?: string;
}) {
  const parseMarkdown = useParseMarkdown;
  if (!children) return null;

  const htmlContent = useMarkdown ? parseMarkdown(children) : children;
  return (
    <p
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export { FormattedText };
