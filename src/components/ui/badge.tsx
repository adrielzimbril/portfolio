import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils/utils";

const badgeVariants = cva(
  "squircle squircle-7xl squircle-smooth-xl inline-flex items-center border-none px-3 py-1.5 font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-inherit squircle-zinc-100 text-gray-900",
        colored: "border-transparent bg-inherit text-gray-900",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
      size: {
        default: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  contentClassName?: string;
}

function Badge({
  className,
  variant,
  size,
  contentClassName,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      <span className={cn("font-medium", contentClassName)}>
        {props.children}
      </span>
    </div>
  );
}

export { Badge, badgeVariants };
