import {
  useRequiredValidator,
  RequiredValidatorProps,
} from "@/hooks/useValidation/useRequiredValidator";

export type DateBetween = {
  min: Date;
  max: Date;
};

export type DateValidatorProps = RequiredValidatorProps & {
  min?: Date;
  max?: Date;
  between?: DateBetween;
};

export const useDateValidator = ({
  label,
  required,
  min,
  max,
  between,
}: DateValidatorProps): ((value: Date) => string | null) => {
  const requiredValidator = useRequiredValidator({ label, required });

  return (value: Date): string | null => {
    if (min && value && value.getTime() < min.getTime()) {
      return `${label} must be greater then ${min.getTime()}`;
    }

    if (max && value && value.getTime() > max.getTime()) {
      return `${label} must be lower then ${max.getTime()}`;
    }

    if (
      between &&
      value &&
      (value.getTime() > between.max.getTime() ||
        value.getTime() < between.min.getTime())
    ) {
      return `${label} must be between ${between.min.getTime()} and ${between.max.getTime()}`;
    }

    return requiredValidator(value);
  };
};
