"use client";

import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import NextLink from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  linkClassName?: string;
  asSquare?: boolean;
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
      asSquare,
      whileTap,
      ...props
    },
    ref
  ) => {
    return asSquare ? (
      <Button
        variant={variant}
        size={size}
        className={cn(className, "cursor-pointer")}
        asChild={true}
      >
        <motion.span whileTap={whileTap ? { scale: 1.05 } : undefined}>
          <NextLink
            className={cn("relative size-full", linkClassName)}
            href={href!}
            ref={ref}
            {...props}
          />
        </motion.span>
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
