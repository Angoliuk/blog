import { tw } from "blog/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { type ReactElement, type ReactNode, memo } from "react";
import { Button } from "../../button";

export type HeaderLeftProps = {
  isHeaderLeftShown?: boolean;
  headerLeft?: ReactNode;
};

export const HeaderLeft = memo(
  ({ isHeaderLeftShown, headerLeft }: HeaderLeftProps): ReactElement | null => {
    return isHeaderLeftShown ? (
      <div className={tw("flex w-1/2 items-center mobile:w-1/3")}>
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
          "flex items-center mobile:w-1/3 mobile:justify-center",
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
    const { data: session } = useSession();
    return isHeaderRightShown ? (
      <div className={tw("flex flex-1 items-center justify-end mobile:w-1/3")}>
        {headerRight ?? (
          <>
            <Link href="/posts/feed">
              <p className="p-6 text-center text-slate-200 duration-75 hover:-translate-y-1">
                Feed
              </p>
            </Link>
            {!!session?.user.id ? (
              <>
                <Link href="/posts/create">
                  <p className="p-6 text-center text-slate-200 duration-75 hover:-translate-y-1">
                    Create
                  </p>
                </Link>
                <Button onClick={() => signOut()}>
                  <p className="p-6 text-center text-slate-200 duration-75 hover:-translate-y-1">
                    Logout
                  </p>
                </Button>
              </>
            ) : (
              <Link href="/auth/sign-in">
                <p className="p-6 text-center text-slate-200 duration-75 hover:-translate-y-1">
                  Login
                </p>
              </Link>
            )}
          </>
        )}
      </div>
    ) : null;
  }
);
