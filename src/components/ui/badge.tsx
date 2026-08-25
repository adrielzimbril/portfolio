import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/utils/utils"

const badgeVariants = cva(
  "squircle-2xl/80 md:squircle-3xl/80 flex h-auto md:h-[stretch] items-center border-none px-3 py-1.5 font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-inherit bg-b-base",
        white: "border-transparent bg-inherit bg-sh-white text-foreground",
        primary: "border-transparent bg-inherit bg-primary text-b-black-unchanged hover:bg-primary/90",
        colored: "border-transparent bg-inherit text-b-white-unchanged",
        inverted: "border-transparent bg-inherit bg-b-white text-foreground",
        secondary: "border-transparent bg-inherit bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-inherit bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
      size: {
        default: "text-xs",
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      circle: {
        true: "aspect-square",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      circle: false,
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  contentClassName?: string
}

function Badge({ className, variant, size, circle, contentClassName, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, circle }), className)} {...props}>
      <span className={cn("font-medium whitespace-pre-line leading-none", contentClassName)}>{props.children}</span>
    </div>
  )
}

export { Badge, badgeVariants }
