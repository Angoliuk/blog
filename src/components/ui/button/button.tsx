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
            // TODO: add reusable styles, unfinished
            [ButtonTypes.CLEAR]: undefined,
            [ButtonTypes.SUBMIT]: "w-full min-w-fit rounded-[10px]",
            [ButtonTypes.SUBMIT_LOADING]: "w-full min-w-fit rounded-[10px]",
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
