import { useCallback, useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayout";

/**
 * Creates a stable callback function that can be used in event handlers.
 */
export function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R
): (...args: Args) => R;

/**
 * Creates a stable callback function that can be used in event handlers.
 */
export function useEventCallback<Args extends unknown[], R>(
  fn: ((...args: Args) => R) | undefined
): ((...args: Args) => R) | undefined;

/**
 * Creates a stable callback function that can be used in event handlers.
 *
 * @param fn - The function to be called when the event is triggered.
 *
 * @returns A stable callback function that can be used in event handlers.
 *
 * @example
 * const handleClick = useEventCallback((event) => {
 *   logger.info(event);
 * });
 */
export function useEventCallback<Args extends unknown[], R>(
  fn: ((...args: Args) => R) | undefined
): ((...args: Args) => R) | undefined {
  const ref = useRef<typeof fn>(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);

  //!! To check
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  return useCallback((...args: Args) => ref.current?.(...args), [ref]) as (
    ...args: Args
  ) => R;
}
