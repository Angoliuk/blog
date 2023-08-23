import { Button, ButtonTypes, FormField } from "blog/components";
import { type Control } from "blog/utils/form";
import { type FormEventHandler, memo, type FC } from "react";
import { type FormValues } from "./use-form";

export type FormProps = {
  control: Control<FormValues>;
  isLoading?: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export const Form: FC<FormProps> = memo(({ control, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit}>
      <FormField
        showPlaceholderWithValue={false}
        control={control}
        name="email"
        placeholder="email"
        className="m-2"
      />
      <FormField
        showPlaceholderWithValue={false}
        control={control}
        name="password"
        type="password"
        placeholder="password"
        className="m-2"
      />
      <Button
        type={isLoading ? ButtonTypes.SUBMIT_LOADING : ButtonTypes.SUBMIT}
        loading={isLoading}
        buttonType="submit"
      >
        <p className="group-hover:text-white">Submit</p>
      </Button>
    </form>
  );
});
