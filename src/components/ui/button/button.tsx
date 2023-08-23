import { type ComponentProps, forwardRef } from "react";

import { tw } from "../../../utils";
import { Loader } from "../loader";

export enum ButtonTypes {
  CLEAR = "clear",
  SUBMIT = "submit",
  SUBMIT_LOADING = "submit_loading",
}

export type ButtonProps = Omit<ComponentProps<"button">, "type"> & {
  type?: ButtonTypes;
  buttonType?: ComponentProps<"button">["type"];
  loading?: boolean;
  disabled?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick,
      loading,
      disabled,
      children,
      type = ButtonTypes.CLEAR,
      buttonType = "button",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={buttonType}
        ref={ref}
        onClick={onClick}
        disabled={loading ?? disabled}
        className={tw(
          {
            [ButtonTypes.CLEAR]: undefined,
            [ButtonTypes.SUBMIT]:
              "group m-auto mt-4 flex w-1/2 justify-center rounded-md border p-2 transition-all hover:bg-slate-600",
            [ButtonTypes.SUBMIT_LOADING]:
              "group m-auto mt-4 flex w-1/2 justify-center rounded-md border bg-slate-600 p-2",
          }[type],
          className
        )}
        {...props}
      >
        {loading ? <Loader /> : children}
      </button>
    );
  }
);
