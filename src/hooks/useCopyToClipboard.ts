"use client";
import { useCallback, useEffect, useState } from "react";

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

/**
 * A hook that copies text to the clipboard
 *
 * @param {Object} options - Options for the hook
 * @param {number} options.isCopiedDelay - Delay in milliseconds before the copied state resets
 *
 * @returns {[CopiedValue, CopyFn, boolean]} - An array containing the copied text, copy function, and copied state
 *
 * @example
 * const [copiedText, copy, isCopied] = useCopyToClipboard();
 * // Use the copy function
 * copy("Hello, world!");
 */
export function useCopyToClipboard({
  isCopiedDelay = 2000,
}: {
  isCopiedDelay?: number;
} = {}): [CopiedValue, CopyFn, boolean] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }
    setTimeout(() => {
      setIsCopied(false);
    }, isCopiedDelay);
  }, [isCopied, isCopiedDelay]);

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setIsCopied(true);
      return true;
    } catch (e) {
      setCopiedText(null);
      console.error(e);
      return false;
    }
  }, []);

  return [copiedText, copy, isCopied];
}
