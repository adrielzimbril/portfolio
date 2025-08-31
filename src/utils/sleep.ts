/**
 * Sleep function
 * @param ms - The number of milliseconds to sleep
 * @returns A promise that resolves after the specified number of milliseconds
 *
 * @example
 * await sleep(1000);
 */
export const sleepInitial = (ms: number | `${number}ms`): Promise<void> => {
  let duration: number;
  if (typeof ms === "string") {
    duration = Number.parseInt(ms, 10);
  } else {
    duration = ms;
  }
  return new Promise((resolve) => setTimeout(resolve, duration));
};

/**
 * Sleep function
 * @param ms - The number of milliseconds to sleep
 * @returns A promise that resolves after the specified number of milliseconds
 *
 * @example
 * await sleep(1000);
 */
export function sleep(ms: number | `${number}ms`): Promise<void> {
  return sleepInitial(ms);
}

// Usage examples:
// await sleep(1000);           // Sleep for 1000ms
// await sleep("500ms");        // Sleep for 500ms
// await sleep("2000ms");       // Sleep for 2000ms
