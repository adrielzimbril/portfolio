"use client";

import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/integrations/content/utils/mdx-components";
import { mdxCustomComponents } from "@/integrations/content/utils/mdx-components";

export function MarkdownContentRender({ content }: { content: string }) {
  return (
    <div className="flex flex-col prose dark:prose-invert mx-auto w-full font-normal text-base">
      <MDXContent
        code={content}
        components={{
          h1: mdxComponents.h1,
          h2: mdxComponents.h2,
          h3: mdxComponents.h3,
          h4: mdxComponents.h4,
          h5: mdxComponents.h5,
          h6: mdxComponents.h6,
          ul: mdxComponents.ul,
          ol: mdxComponents.ol,
          li: mdxComponents.li,
          table: mdxComponents.table,
          tbody: mdxComponents.tbody,
          thead: mdxComponents.thead,
          tr: mdxComponents.tr,
          th: mdxComponents.th,
          td: mdxComponents.td,
          blockquote: mdxComponents.blockquote,
          span: mdxComponents.span,
          p: mdxComponents.p,
          a: mdxComponents.a,
          img: mdxComponents.img,
          ChallengeRegisterLink: mdxComponents.ChallengeRegisterLink,
          ChallengeSubmitLink: mdxComponents.ChallengeSubmitLink,
          ...mdxCustomComponents,
        }}
      />
    </div>
  );
}
