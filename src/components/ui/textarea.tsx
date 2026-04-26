"use client";
import * as React from "react";
import { cn } from "@/utils";
import { VariantProps } from "class-variance-authority";
import { inputVariants } from "@/components/ui/input";
import { useTranslations } from "use-intl";

function Textarea({
  className,
  autoGrow = false,
  limit = Infinity,
  showLimit = false,
  variant,
  inputSize,
  value: externalValue,
  onChange: externalOnChange,
  ...props
}: React.ComponentProps<"textarea"> & {
  autoGrow?: boolean;
  limit?: number;
  showLimit?: boolean;
  variant?: VariantProps<typeof inputVariants>["variant"];
  inputSize?: VariantProps<typeof inputVariants>["inputSize"];
}) {
  const t = useTranslations();
  const id = React.useId();
  const maxLength = limit;

  // Use external value if provided (from react-hook-form), otherwise use internal state
  const isControlled = externalValue !== undefined;
  const [internalValue, setInternalValue] = React.useState("");
  const value = isControlled ? externalValue : internalValue;

  const characterCount = String(value ?? "").length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      if (externalOnChange) {
        externalOnChange(e);
      } else {
        setInternalValue(newValue);
      }
    }
  };

  return (
    <>
      <textarea
        id={id}
        data-slot="textarea"
        className={cn(
          "border-b-base-accent text-inherit focus-visible:ring-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex min-h-19.5 w-full rounded-md border bg-transparent px-3 py-2 text-lg shadow-none outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
          autoGrow &&
            "field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75",
          "text-b-white-foreground",
          inputVariants({ variant, inputSize, className }),
          "overflow-y-auto resize-none",
        )}
        value={value}
        maxLength={maxLength}
        onChange={handleChange}
        aria-describedby={`${id}-description`}
        {...props}
      />
      {showLimit && limit !== Infinity && (
        <p
          id={`${id}-description`}
          className="text-muted-foreground mt-2 text-right text-xs"
          role="status"
          aria-live="polite"
        >
          <span className="tabular-nums">{maxLength - characterCount}</span>{" "}
          {t("common.shared.text.characters-left")}
        </p>
      )}
    </>
  );
}
Textarea.displayName = "Textarea";

export { Textarea };
