import {
  useRequiredValidator,
  RequiredValidatorProps,
} from "@/hooks/useValidation/useRequiredValidator";

export type StringValidatorProps = RequiredValidatorProps<string> & {
  min?: number;
  max?: number;
  regex?: RegExp;
};

export const useStringValidator = ({
  label,
  required = true,
  min,
  max,
  regex,
}: StringValidatorProps): ((value: string) => string | null) => {
  const requiredValidator = useRequiredValidator({
    value: "",
    label,
    required,
  });

  return (value: string) => {
    if (value) {
      if (min && value.length < min) {
        return `${label} must be at least ${min} characters long`;
      }

      if (max && value.length > max) {
        return `${label} must be shorter than ${max} characters`;
      }

      if (regex && !regex.test(value.trim())) {
        return `${label} is not in valid format`;
      }
    }

    return requiredValidator(value);
  };
};
