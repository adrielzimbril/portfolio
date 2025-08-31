"use client";

import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import NextLink from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/utils";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  linkClassName?: string;
  likeButton?: boolean;
  asFull?: boolean;
  asIcon?: boolean;
  whileTap?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant,
      size,
      href,
      linkClassName,
      likeButton,
      asFull,
      asIcon,
      whileTap,
      ...props
    },
    ref
  ) => {
    return likeButton ? (
      <Button
        variant={variant}
        size={size}
        asFull={asFull}
        asIcon={asIcon}
        className={cn(className)}
        asChild={true}
        whileTap={whileTap}
        asPointer
      >
        <span className="relative">
          <NextLink
            className={cn("relative size-full", linkClassName)}
            href={href!}
            ref={ref}
            {...props}
          />
        </span>
      </Button>
    ) : (
      <NextLink
        className={cn("relative", className)}
        href={href!}
        ref={ref}
        {...props}
      />
    );
  }
);
Link.displayName = "Link";

export { Link };
