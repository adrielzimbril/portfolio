import { useCallback } from "react";

/**
 * Hook to scroll to an element by its ID.
 *
 * @param {string} id - The ID of the element to scroll to.
 * @param {number} offset - The offset from the top of the element.
 *
 * @returns {Function} A function that takes an element ID and an optional offset.
 *
 * @example
 * const scrollToId = useScrollTo();
 * scrollToId("my-element", 100);
 */
export function useScrollTo() {
  const scrollToId = useCallback((id: string, offset: number = 0) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return scrollToId;
}
