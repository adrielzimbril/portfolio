import { useStringValidator } from "@/hooks/useValidation/useStringValidator";
import { RequiredValidatorProps } from "@/hooks/useValidation/useRequiredValidator";

const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const useEmailValidator = ({
  label,
  required = true,
}: RequiredValidatorProps): ((value: string) => string | null) => {
  return useStringValidator({ label, required, regex: emailRegex });
};
