import { useParseMarkdown } from "@/hooks/useParseMarkdown";

function FormattedText({
  children,
  className,
  useMarkdown = false,
  inParagraph = true,
}: {
  children?: string;
  useMarkdown?: boolean;
  className?: string;
  inParagraph?: boolean;
}) {
  const parseMarkdown = useParseMarkdown;
  if (!children) return null;

  const htmlContent = useMarkdown ? parseMarkdown(children) : children;
  return inParagraph ? (
    <p
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  ) : (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export { FormattedText };
