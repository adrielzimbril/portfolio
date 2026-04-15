import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils/utils";

const badgeVariants = cva(
  "squircle squircle-2xl md:squircle-7xl squircle-smooth-lg md:squircle-smooth-xl inline-flex items-center border-none px-3 py-1.5 font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-inherit squircle-b-base",
        colored: "border-transparent bg-inherit text-b-white-unchanged",
        inverted:
          "border-transparent bg-inherit squircle-b-white text-foreground",
        secondary:
          "border-transparent bg-inherit squircle-secondary text-secondary-foreground hover:squircle-secondary/80",
        destructive:
          "border-transparent bg-inherit squircle-destructive text-destructive-foreground hover:squircle-destructive/80",
        outline: "text-foreground",
      },
      size: {
        default: "text-xs",
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
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  contentClassName?: string;
}

function Badge({
  className,
  variant,
  size,
  circle,
  contentClassName,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, circle }), className)}
      {...props}
    >
      <span className={cn("font-medium whitespace-pre-line", contentClassName)}>
        {props.children}
      </span>
    </div>
  );
}

export { Badge, badgeVariants };
