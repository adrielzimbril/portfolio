import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/shared/preview";
import { CardInfo } from "@/components/shared/pages/shop/details";
import { PageType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import type { Product as ProductType } from "@/data/personal/shop-products";
import { siteConfig } from "@/data/config";

export type Product = ProductType;

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group relative squircle squircle-b-base-second squircle-6xl squircle-smooth-xl size-full border-0">
      <CardContent className="relative grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4 size-full grid-rows-[auto_1fr]">
        <CardPreview
          title={product.title}
          slug={siteConfig.links.contact.social.whatsapp.url}
          cover={product.image}
          coverText={{
            emoji: "🛍️",
            title: product.title,
            description: product.description,
          }}
        />
        <CardInfo
          title={product.title}
          primaryTag={product.primaryTag}
          tags={product.tags}
          isAvailable={product.available}
          description={product.description}
          price={product.price}
          currency={product.currency}
        />
      </CardContent>
    </Card>
  );
}
