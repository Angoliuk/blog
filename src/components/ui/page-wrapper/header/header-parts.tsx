import { tw } from "blog/utils";
import Link from "next/link";
import { type ReactElement, type ReactNode, memo } from "react";

export type HeaderLeftProps = {
  isHeaderLeftShown?: boolean;
  headerLeft?: ReactNode;
};

export const HeaderLeft = memo(
  ({ isHeaderLeftShown, headerLeft }: HeaderLeftProps): ReactElement | null => {
    return isHeaderLeftShown ? (
      <div className={tw("mobile:w-1/3 flex w-1/2 items-center")}>
        {headerLeft}
      </div>
    ) : null;
  }
);

export type HeaderCenterProps = {
  isHeaderCenterShown?: boolean;
  headerCenter?: ReactNode;
  headerCenterClassName?: string;
};

export const HeaderCenter = memo(
  ({
    isHeaderCenterShown,
    headerCenter,
    headerCenterClassName,
  }: HeaderCenterProps): ReactElement | null => {
    return isHeaderCenterShown ? (
      <div
        className={tw(
          "mobile:w-1/3 mobile:justify-center flex items-center",
          headerCenterClassName
        )}
      >
        {headerCenter}
      </div>
    ) : null;
  }
);

export type HeaderRightProps = {
  isHeaderRightShown?: boolean;
  headerRight?: ReactNode;
};

export const HeaderRight = memo(
  ({
    isHeaderRightShown,
    headerRight,
  }: HeaderRightProps): ReactElement | null => {
    return isHeaderRightShown ? (
      <div className={tw("mobile:w-1/3 flex flex-1 items-center justify-end")}>
        {headerRight ?? (
          <>
            <Link href="/posts/feed">
              <p className="p-6 text-center text-slate-200 duration-75 hover:-translate-y-1">
                Feed
              </p>
            </Link>
            <Link href="/posts/create">
              <p className="p-6 text-center text-slate-200 duration-75 hover:-translate-y-1">
                Create
              </p>
            </Link>
          </>
        )}
      </div>
    ) : null;
  }
);
