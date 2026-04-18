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
          "squircle squircle-mask squircle-4xl squircle-smooth-3xl squircle-border-2 squircle-border-b-base-accent squircle-b-base data-[state=checked]:squircle-primary data-[state=checked]:squircle-border-primary",
        glass:
          "rounded-full border border-b-base/20 bg-b-base backdrop-blur-md before:rounded-full data-[state=checked]:bg-primary/80 data-[state=checked]:border-primary",
      },
      size: {
        xs: "size-2.5",
        sm: "size-3.5",
        default: "size-4.5 sm:size-4",
        lg: "size-6 sm:size-5",
        xl: "size-8 sm:size-6",
      },
      color: {
        default: "data-checked:bg-primary",
        primary: "data-checked:bg-primary",
        secondary: "data-checked:bg-secondary",
        destructive: "data-checked:bg-destructive",
        accent: "data-checked:bg-accent",
        muted: "data-checked:bg-muted",
        success: "data-checked:bg-green-500",
        warning: "data-checked:bg-yellow-500",
      },
    },
    compoundVariants: [
      {
        variant: "squircle",
        color: "default",
        class: "data-[state=checked]:squircle-primary",
      },
      {
        variant: "squircle",
        color: "primary",
        class: "data-[state=checked]:squircle-primary",
      },
      {
        variant: "squircle",
        color: "secondary",
        class: "data-[state=checked]:squircle-secondary",
      },
      {
        variant: "squircle",
        color: "destructive",
        class: "data-[state=checked]:squircle-destructive",
      },
      {
        variant: "squircle",
        color: "accent",
        class: "data-[state=checked]:squircle-accent",
      },
      {
        variant: "squircle",
        color: "muted",
        class: "data-[state=checked]:squircle-muted",
      },
      {
        variant: "squircle",
        color: "success",
        class: "data-[state=checked]:squircle-success",
      },
      {
        variant: "squircle",
        color: "warning",
        class: "data-[state=checked]:squircle-warning",
      },
    ],
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
          size === "xs" && "size-2.5 before:size-1",
          size === "sm" && "size-3.5 before:size-1.5",
          (size === "default" || !size) &&
            "size-4.5 sm:size-4 before:size-2 sm:before:size-1.5",
          size === "lg" && "size-6 sm:size-5 before:size-2.5 sm:before:size-2",
          size === "xl" && "size-8 sm:size-6 before:size-3 sm:before:size-2.5",
        )}
        data-slot="radio-indicator"
      />
    </RadioPrimitive.Root>
  );
}

export { RadioGroupPrimitive, RadioPrimitive, Radio as RadioGroupItem };
