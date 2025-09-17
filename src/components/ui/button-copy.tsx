"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon, CopyIcon } from "lucide-react";
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  buttonVariants,
} from "@/components/ui/button";
import { cn } from "@/utils";
import { useControlledState } from "@/hooks/useControlledState";
import logger from "@/utils/logger";
import { useTranslations } from "use-intl";

const buttonVariantss = cva(
  "flex items-center justify-center rounded-md transition-[box-shadow,_color,_background-color,_border-color,_outline-color,_text-decoration-color,_fill,_stroke] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        accent: "bg-accent text-accent-foreground shadow-xs hover:bg-accent/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "size-9",
        xs: "size-7 [&_svg:not([class*='size-'])]:size-3.5 rounded-md",
        sm: "size-8 rounded-md",
        lg: "size-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonCopyProps = Omit<ButtonPrimitiveProps, "children"> &
  VariantProps<typeof buttonVariants> & {
    content: string;
    node?: React.ReactNode;
    copied?: boolean;
    onCopiedChange?: (copied: boolean, content?: string) => void;
    delay?: number;
    asIcon?: boolean;
  };

function ButtonCopy({
  className,
  asIcon,
  content,
  node,
  copied,
  onCopiedChange,
  onClick,
  variant,
  size = "icon",
  delay = 3000,
  ...props
}: ButtonCopyProps) {
  const [isCopied, setIsCopied] = useControlledState({
    value: copied,
    onChange: onCopiedChange,
  });
  const t = useTranslations();

  const handleCopy = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (copied) return;
      if (content) {
        navigator.clipboard
          .writeText(content)
          .then(() => {
            setIsCopied(true);
            onCopiedChange?.(true, content);
            setTimeout(() => {
              setIsCopied(false);
              onCopiedChange?.(false);
            }, delay);
          })
          .catch((error) => {
            logger.error(t("logger.components.button-copy.failed"), error);
          });
      }
    },
    [onClick, copied, content, setIsCopied, onCopiedChange, delay]
  );

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <ButtonPrimitive
      data-slot="copy-button"
      variant={variant}
      size={size}
      asIcon={asIcon}
      className={cn("aspect-square p-2 size-8 [&_svg]:size-4", className)}
      onClick={handleCopy}
      {...props}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={
            isCopied
              ? t("common.shared.text.copied")
              : t("common.shared.text.copy")
          }
          data-slot="copy-button-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.15 }}
        >
          {node || <Icon />}
        </motion.span>
      </AnimatePresence>
    </ButtonPrimitive>
  );
}

export { ButtonCopy, buttonVariants, type ButtonCopyProps };
