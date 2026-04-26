export type RequiredValidatorProps<T> = {
  label: string;
  required: boolean;
} & {
  value: string | number | T[] | Date | File;
};

export const useRequiredValidator = <T>({
  label,
  required,
}: RequiredValidatorProps<T>): ((
  value: string | number | T[] | Date | File
) => string | null) => {
  return (value: string | number | T[] | Date | File): string | null => {
    if (required) {
      if (typeof value === "string" && !value.trim()) {
        return `${label} is required`;
      } else if (Array.isArray(value) && !value.length) {
        return `${label} is required`;
      } else if (!value) {
        return `${label} is required`;
      }
    }

    return null;
  };
};
