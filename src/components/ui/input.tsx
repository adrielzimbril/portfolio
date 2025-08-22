import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { VariantProps } from "class-variance-authority";

const inputVariants = cva("relative rounded-2xl border-2 overflow-hidden", {
  variants: {
    variant: {
      default: "bg-zinc-50  border-zinc-200",
      secondary: "bg-white border-zinc-200",
      outline: "bg-transparent border-zinc-200",
    },
    inputSize: {
      default: "px-6 py-3",
      sm: "px-3 py-2",
      lg: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    inputSize: "default",
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asFull?: boolean;
  inputSize?: "default" | "sm" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground flex h-12 w-full min-w-0 px-4 py-2 text-lg shadow-none transition-[color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            type === "search" &&
              "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
            type === "file" &&
              "text-muted-foreground/70 file:border-zinc-200 file:text-foreground p-0 pr-3 italic file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-white file:px-3 file:text-lg file:font-medium file:not-italic",

            inputVariants({ variant, inputSize, className })
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
