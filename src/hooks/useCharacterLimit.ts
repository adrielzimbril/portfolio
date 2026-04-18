"use client";

import { ChangeEvent, useState } from "react";

type UseCharacterLimitProps = {
  maxLength: number;
  initialValue?: string;
};

export function useCharacterLimit({
  maxLength,
  initialValue = "",
}: UseCharacterLimitProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;

    setValue(newValue.slice(0, maxLength));
  };

  return {
    value,
    characterCount: value.length,
    handleChange,
    maxLength,
  };
}
