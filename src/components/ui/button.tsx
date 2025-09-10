import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils/utils";

const buttonVariants = cva(
  "inline-flex squircle squircle-7xl squircle-smooth-xl hover:squircle-xl items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-inherit squircle-primary text-primary-foreground hover:squircle-primary/90",
        secondary:
          "bg-inherit squircle-white squircle-border-2 squircle-border-zinc-200 text-black hover:bg-secondary/80 hover:squircle-primary/90 hover:text-white",
        destructive:
          "squircle-destructive text-destructive-foreground hover:squircle-destructive/90",
        outline:
          "squircle squircle-7xl squircle-transparent squircle-border-2 squircle-border-zinc-600",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        icon: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        none: "relative z-[1]",
      },
      size: {
        default: "px-6 py-3",
        xs: "px-3 py-2",
        sm: "px-3 py-4",
        lg: "px-6 py-3 text-lg",
        iconSmall: "px-1 py-1",
        icon: "h-9 w-9",
        nav: "px-4 py-2",
        none: "px-0 py-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  asFull?: boolean;
  asIcon?: boolean;
  asPointer?: boolean;
  whileTap?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      asFull = false,
      asIcon = false,
      asPointer = false,
      whileTap = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          asFull && "w-full flex text-center items-center justify-center",
          asIcon && "[&_svg]:size-auto",
          asPointer && "cursor-pointer",
          whileTap && "hover:scale-105"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
