import { tw } from "blog/utils";
import { type ComponentProps, type FC } from "react";

export type LoaderProps = { wrapperClassName?: string } & ComponentProps<"div">;

export const Loader: FC<LoaderProps> = ({
  wrapperClassName,
  className,
  ...props
}) => (
  <div className={tw("flex w-full justify-center", wrapperClassName)}>
    <div
      {...props}
      className={tw(
        "inline-block h-5 w-5 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700",
        className
      )}
    />
  </div>
);
