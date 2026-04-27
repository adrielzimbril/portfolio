import {
  useRequiredValidator,
  RequiredValidatorProps,
} from "@/hooks/useValidation/useRequiredValidator";

export type NumberValidatorProps = RequiredValidatorProps<number> & {
  min?: number;
  max?: number;
};

export const useNumberValidator = ({
  label,
  required,
  min,
  max,
}: NumberValidatorProps): ((value: number) => string | null) => {
  const requiredValidator = useRequiredValidator({ value: 0, label, required });

  return (value: number): string | null => {
    if (value && min && value < min) {
      return `${label} must be larger than  ${min}.`;
    }

    if (value && max && value > max) {
      return `${label} must be less than ${max}.`;
    }

    return requiredValidator(value);
  };
};
