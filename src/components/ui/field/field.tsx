import {
  type ChangeEventHandler,
  type ComponentType,
  type FocusEventHandler,
  type ReactElement,
  type ReactNode,
  type Ref,
  forwardRef,
  memo,
  useCallback,
  useState,
} from "react";

import {
  Button,
  type ButtonProps,
  ButtonTypes,
  FormError,
  type FormErrorType,
  Input,
  type InputProps,
  InputTypes,
  TextArea,
} from "..";
import { Image } from "../image";
import { EyeOffIcon, EyeOnIcon } from "public/svg";
import { tw } from "blog/utils";

export type FieldProps = {
  value: string;
  defaultValue?: string;
  error?: FormErrorType;
  keyboardType?: InputProps["inputMode"];
  type?: InputProps["inputType"];
  inputType?: "textarea";
  required?: boolean;
  placeholder?: string | null;
  isHiddenText?: boolean;
  showPlaceholderWithValue?: boolean;
  showErrors?: boolean;
  autoCorrect?: boolean;
  inputClassName?: string;
  className?: string;
  removeDefaultStyles?: boolean;
  touched?: boolean;
  rightImage?:
    | Exclude<ReactNode, string>
    | ComponentType<{ className?: string }>;
  rightImageClassName?: string;
  rightImageContainerClassName?: string;
  editable?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onClick?: ButtonProps["onClick"];
  onRightImageClick?: ButtonProps["onClick"];
};

export const Field = memo(
  forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps>(
    (
      {
        className,
        inputClassName,
        value,
        error,
        isHiddenText,
        type,
        inputType,
        keyboardType,
        required,
        placeholder = "",
        touched,
        showPlaceholderWithValue = true,
        showErrors = true,
        rightImage: RightImageComponent,
        rightImageClassName,
        rightImageContainerClassName,
        removeDefaultStyles,
        autoCorrect,
        editable,
        onChange,
        onFocus,
        onBlur,
        onClick,
        onRightImageClick,
      },
      ref
    ): ReactElement | null => {
      const [isHidden, setIsHidden] = useState(isHiddenText ?? true);
      const [isFocused, setIsFocused] = useState(false);

      const isInputHighlighted = isFocused || !!value;

      const inputStyleType =
        // eslint-disable-next-line no-nested-ternary
        touched && error
          ? InputTypes.ERROR
          : isInputHighlighted
          ? InputTypes.TOUCHED
          : InputTypes.DEFAULT;

      const handleFocus = useCallback<
        FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>
      >(
        (event) => {
          setIsFocused(true);
          return onFocus?.(event);
        },
        [onFocus]
      );

      const handleBlur = useCallback<
        FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>
      >(
        (event) => {
          setIsFocused(false);
          return onBlur?.(event);
        },
        [onBlur]
      );

      const withButtonWrapper = (children: ReactNode) =>
        onClick ? (
          <Button type={ButtonTypes.CLEAR} className="w-full" onClick={onClick}>
            <div className="pointer-events-none">{children}</div>
          </Button>
        ) : (
          children
        );

      return (
        <div className={tw("relative max-w-full", className)}>
          {isInputHighlighted && showPlaceholderWithValue && (
            <div className="bg-white-1000 absolute -top-2 left-6 z-10 px-1.5">
              <p
                className={tw(
                  "bg-white-1000 text-regular-caption",
                  error && touched ? "text-red-1000" : "text-black-600"
                )}
              >
                {placeholder}
              </p>
            </div>
          )}
          {withButtonWrapper(
            <>
              {inputType === "textarea" ? (
                <TextArea
                  ref={ref as Ref<HTMLTextAreaElement>}
                  className={inputClassName}
                  readOnly={editable == null ? false : !editable}
                  type={removeDefaultStyles ? InputTypes.NONE : inputStyleType}
                  spellCheck={autoCorrect}
                  placeholder={
                    isInputHighlighted
                      ? ""
                      : placeholder + (required ? "*" : "")
                  }
                  inputMode={keyboardType}
                  value={value}
                  onChange={onChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
              ) : (
                <Input
                  ref={ref as Ref<HTMLInputElement>}
                  className={tw("placeholder-black-600", inputClassName)}
                  readOnly={editable == null ? false : !editable}
                  type={removeDefaultStyles ? InputTypes.NONE : inputStyleType}
                  spellCheck={autoCorrect}
                  placeholder={
                    isInputHighlighted
                      ? ""
                      : placeholder + (required ? "*" : "")
                  }
                  inputMode={keyboardType}
                  // eslint-disable-next-line no-nested-ternary
                  inputType={
                    type === "password"
                      ? isHidden
                        ? "password"
                        : "text"
                      : type
                  }
                  value={value}
                  onChange={onChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
              )}
              {type === "password" && !RightImageComponent && (
                <Button
                  type={ButtonTypes.CLEAR}
                  className="bg-white-1000 absolute z-10 -translate-x-8 translate-y-3 self-end"
                  onClick={() => setIsHidden(!isHidden)}
                >
                  <Image
                    alt="hide icon"
                    src={isHidden ? EyeOffIcon : EyeOnIcon}
                  />
                </Button>
              )}
              {RightImageComponent && (
                <Button
                  type={ButtonTypes.CLEAR}
                  className={tw(
                    "bg-white-1000 z-50 -translate-x-8 -translate-y-4 self-end",
                    rightImageContainerClassName
                  )}
                  onClick={onRightImageClick}
                >
                  {typeof RightImageComponent === "function" ? (
                    <RightImageComponent
                      className={tw(
                        "bg-white-1000 absolute z-50",
                        rightImageClassName
                      )}
                    />
                  ) : (
                    RightImageComponent
                  )}
                </Button>
              )}
            </>
          )}
          {showErrors ? (
            <div className="flex w-full justify-end">
              <FormError errorText={touched && error} />
            </div>
          ) : null}
        </div>
      );
    }
  )
);
