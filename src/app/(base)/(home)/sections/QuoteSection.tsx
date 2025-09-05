import { siteConfig } from "@/data/config";
import { getImageUrl } from "@/utils/base-url";

export function QuoteSection() {
  const { quoteSection } = siteConfig;

  return (
    <section className="flex flex-col items-center justify-center border-y- dborder-border border-dashed py-10 w-full p-14 z-20">
      <blockquote className="max-w-3xl text-left px-4">
        <p className="text-xl md:text-2xl text-primary leading-relaxed tracking-tighter font-medium mb-6">
          {quoteSection.quote}
        </p>

        <div className="flex gap-4">
          <div className="size-10 rounded-full bg-primary border border-border">
            <img
              src={getImageUrl(quoteSection.author.image)}
              alt={quoteSection.author.name}
              className="size-full rounded-full object-contain"
            />
          </div>
          <div className="text-left">
            <cite className="text-lg font-medium text-primary not-italic">
              {quoteSection.author.name}
            </cite>
            <p className="text-sm text-primary">{quoteSection.author.role}</p>
          </div>
        </div>
      </blockquote>
    </section>
  );
}
