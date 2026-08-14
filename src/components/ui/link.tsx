"use client"
import * as React from "react"
import { cn } from "@/utils/utils"
import { type VariantProps } from "class-variance-authority"
import NextLink from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof buttonVariants> {
  variant?:
    "default" | "base" | "secondary" | "destructive" | "outline" | "colored" | "ghost" | "icon" | "link" | "none"
  size?: "default" | "xs" | "sm" | "lg" | "iconSmall" | "icon" | "nav" | "none"
  linkClassName?: string
  likeButton?: boolean
  asFull?: boolean
  asIcon?: boolean
  whileTap?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, href, linkClassName, likeButton, asFull, asIcon, whileTap, ...props }, ref) => {
    return likeButton ? (
      <Button
        variant={variant}
        size={size}
        asFull={asFull}
        asIcon={asIcon}
        className={cn(className)}
        render={
          <span className="relative">
            <NextLink className={cn("relative size-full", linkClassName)} href={href!} ref={ref} {...props} />
          </span>
        }
        whileTap={whileTap}
        asPointer
      />
    ) : (
      <NextLink
        className={cn("relative", className)}
        href={href!}
        ref={ref}
        data-space-hover={(props as any)["data-space-hover"] || "tick"}
        {...props}
      />
    )
  },
)
Link.displayName = "Link"

export { Link }
