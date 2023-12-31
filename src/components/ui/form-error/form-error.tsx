import { type FC } from "react";

export type FormErrorType = string | false | null;

export type FormErrorProps = {
  errorText?: FormErrorType;
};

export const FormError: FC<FormErrorProps> = ({ errorText }) => (
  <p className="text-red-700">{errorText ?? " "}</p>
);
