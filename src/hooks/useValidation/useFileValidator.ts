import {
  RequiredValidatorProps,
  useRequiredValidator,
} from "@/hooks/useValidation/useRequiredValidator";

export type FileValidatorProps = RequiredValidatorProps<File> & {
  max?: number;
  allowedExtensions: string[];
};

export const useFileValidator = ({
  label,
  required,
  max,
  allowedExtensions,
}: FileValidatorProps): ((value: File) => string | null) => {
  const requiredValidator = useRequiredValidator({
    value: "",
    label,
    required,
  });

  return (value: File): string | null => {
    if (required || value) {
      if (required && !value) {
        return `${label} is required`;
      }
      if (allowedExtensions) {
        const extensionIsValid = allowedExtensions
          .map((v) => v.toLowerCase())
          .includes(value.type.toLowerCase());
        if (!extensionIsValid) {
          return `${label} has unsupported file format`;
        }
      }
      if (max && value.size >= max) {
        return `${label} file is too large`;
      }
    }

    return requiredValidator(value);
  };
};
