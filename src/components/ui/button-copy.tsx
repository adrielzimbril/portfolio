"use client";
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
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
      className={cn("aspect-square p-2 size-9 [&_svg]:size-4", className)}
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
