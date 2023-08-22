import { type FC, type ReactNode } from "react";

import { Header, type HeaderProps } from "./header/header";
import { tw } from "blog/utils";

export type PageWrapperProps = {
  children: ReactNode;
  contentWrapperClassName?: string;
  isShown?: boolean;
  className?: string;
} & HeaderProps;

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  isShown = true,
  className,
  isHeaderShown = true,
  contentWrapperClassName,
  header,
  isHeaderLeftShown = true,
  isHeaderRightShown = true,
  isHeaderCenterShown = true,
  headerLeft,
  headerRight,
  headerCenter,
  headerCenterClassName,
}) => {
  return isShown ? (
    <div
      className={tw(
        "bg-white-1000 flex h-full min-h-full w-full flex-1 flex-col",
        className
      )}
    >
      <Header
        isHeaderShown={isHeaderShown}
        header={header}
        isHeaderLeftShown={isHeaderLeftShown}
        isHeaderRightShown={isHeaderRightShown}
        isHeaderCenterShown={isHeaderCenterShown}
        headerLeft={headerLeft}
        headerRight={headerRight}
        headerCenter={headerCenter}
        headerCenterClassName={headerCenterClassName}
      />
      <div
        className={tw(
          "flex h-full min-h-0 w-full flex-1 flex-col overflow-y-auto px-5 py-3",
          contentWrapperClassName
        )}
      >
        {children}
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};
