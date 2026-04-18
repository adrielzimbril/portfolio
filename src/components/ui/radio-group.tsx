"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import type React from "react";
import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";

const radioVariants = cva(
  "relative aspect-square inline-flex shrink-0 items-center justify-center outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-disabled:cursor-not-allowed data-disabled:opacity-64",
  {
    variants: {
      variant: {
        default:
          "rounded-full border border-input bg-background not-dark:bg-clip-padding shadow-xs/5 before:rounded-full not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48 dark:not-data-checked:bg-input/32 dark:aria-invalid:ring-destructive/24 dark:not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)] [[data-disabled],[data-checked],[aria-invalid]]:shadow-none",
        squircle:
          "squircle squircle-mask squircle-3xl squircle-smooth-xl squircle-border-2 squircle-border-b-base-accent bg-b-base data-[state=checked]:squircle-primary data-[state=checked]:squircle-border-primary",
        glass:
          "rounded-full border border-white/20 bg-white/10 backdrop-blur-md before:rounded-full data-[state=checked]:bg-primary/80 data-[state=checked]:border-primary",
      },
      size: {
        sm: "size-3.5",
        default: "size-4.5 sm:size-4",
        lg: "size-6 sm:size-5",
      },
      color: {
        default: "data-checked:bg-primary",
        primary: "data-checked:bg-primary",
        secondary: "data-checked:bg-secondary",
        destructive: "data-checked:bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "default",
    },
  },
);

export function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props): React.ReactElement {
  return (
    <RadioGroupPrimitive
      className={cn("flex flex-col gap-3", className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

export interface RadioProps
  extends RadioPrimitive.Root.Props, VariantProps<typeof radioVariants> {}

export function Radio({
  className,
  variant,
  size,
  color,
  ...props
}: RadioProps): React.ReactElement {
  return (
    <RadioPrimitive.Root
      className={cn(radioVariants({ variant, size, color }), className)}
      data-slot="radio"
      {...props}
    >
      <RadioPrimitive.Indicator
        className={cn(
          "absolute flex items-center justify-center before:rounded-full before:bg-primary-foreground data-unchecked:hidden data-checked:bg-primary",
          variant !== "squircle" ? "-inset-px rounded-full " : "before:",
          size === "sm" && "size-3.5 before:size-1.5",
          (size === "default" || !size) &&
            "size-4.5 sm:size-4 before:size-2 sm:before:size-1.5",
          size === "lg" && "size-6 sm:size-5 before:size-2.5 sm:before:size-2",
        )}
        data-slot="radio-indicator"
      />
    </RadioPrimitive.Root>
  );
}

export { RadioGroupPrimitive, RadioPrimitive, Radio as RadioGroupItem };
