import { useEffect, useLayoutEffect } from "react";

/**
 * Use isomorphic layout effect.
 *
 * @returns {void}
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
