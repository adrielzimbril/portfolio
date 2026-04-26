import { useRequiredValidator } from "@/hooks/useValidation/useRequiredValidator";
import { RequiredValidatorProps } from "@/hooks/useValidation/useRequiredValidator";
import isEmail from "validator/lib/isEmail";

export const useEmailValidator = ({
  label,
  required = true,
}: RequiredValidatorProps<string>): ((value: string) => string | null) => {
  const requiredValidator = useRequiredValidator({
    value: "",
    label,
    required,
  });

  return (value: string) => {
    if (value && !isEmail(value.trim())) {
      return `${label} is not a valid email address`;
    }

    return requiredValidator(value);
  };
};
