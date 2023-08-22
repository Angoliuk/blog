import { type ReactElement } from "react";

import { Field, type FieldProps } from "../field";
import {
  type Control,
  type FieldPathByValue,
  type FieldValues,
  type PathValue,
  useController,
} from "blog/utils/form";

export type FormFieldProps<
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, string | number>
> = Omit<
  FieldProps,
  "value" | "defaultValue" | "touched" | "error" | "onBlur"
> & {
  control: Control<TFieldValues>;
  name: TPath;
  defaultValue?: PathValue<TFieldValues, TPath>;
};

export const FormField = <
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, string | number>
>({
  name,
  defaultValue,
  control,
  ...props
}: FormFieldProps<TFieldValues, TPath>): ReactElement | null => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <Field
      {...props}
      {...field}
      touched={fieldState.isTouched}
      error={fieldState.error?.message ?? fieldState.error?.type}
    />
  );
};
