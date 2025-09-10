export type RequiredValidatorProps = {
  label: string;
  required: boolean;
}

export const useRequiredValidator = ({
  label,
  required
}: RequiredValidatorProps): ((
  value: string | number | any[] | Date | File
) => string | null) => {
  return (value: number | string | any[] | Date): string | null => {
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
