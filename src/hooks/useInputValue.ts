"use client";
import { type ChangeEvent, useState } from "react";

/**
 * Returns an object containing the current value and an onChange handler for an input element.
 *
 * @param initialValue - The initial value of the input element.
 *
 * @returns An object containing the current value and an onChange handler for an input element.
 *
 * @example
 * const { value, onChange } = useInputValue("initial value");
 */
export function useInputValue(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  return {
    value,
    onChange,
  };
}
