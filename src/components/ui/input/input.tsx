import { tw } from "blog/utils";
import { type ComponentProps, forwardRef } from "react";

export enum InputTypes {
  TOUCHED = "touched",
  ERROR = "error",
  DEFAULT = "default",
  NONE = "none",
}

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete */
export type Autocomplete =
  | "off"
  | "on"
  | "name"
  | "given-name"
  | "family-name"
  | "additional-name"
  | "nickname"
  | "email"
  | "username"
  | "new-password"
  | "current-password"
  | "one-time-code"
  | "street-address"
  | "language"
  | "sex"
  | "url"
  | "photo"
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {});

export type InputProps = Omit<
  ComponentProps<"input">,
  "autoComplete" | "type"
> & {
  type: InputTypes;
  inputType?: ComponentProps<"input">["type"];
  autoComplete?: Autocomplete;
};

const inputClassName = (type: InputTypes, component: "input" | "textarea") =>
  tw(
    "outline-none focus-visible:outline-none",
    type !== InputTypes.NONE &&
      "w-full h-12 px-5 py-3 rounded-xl border-[1px] text-black-1000 focus-visible:border-black-600",
    type !== InputTypes.NONE &&
      component === "textarea" &&
      "align-top pt-4 min-h-[50px] max-h-[150px] h-auto",
    {
      [InputTypes.ERROR]: "border-red-1000 focus-visible:border-red-1000",
      [InputTypes.TOUCHED]: "border-black-600",
      [InputTypes.DEFAULT]: "border-black-100",
      [InputTypes.NONE]: "",
    }[type]
  );

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, inputType, className, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      type={inputType}
      className={tw(inputClassName(type, "input"), className)}
    />
  )
);

export type TextAreaProps = Omit<ComponentProps<"textarea">, "autoComplete"> & {
  type: InputTypes;
  autoComplete?: Autocomplete;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ type, className, ...props }, ref) => (
    <textarea
      {...props}
      ref={ref}
      className={tw(inputClassName(type, "textarea"), className)}
    />
  )
);
