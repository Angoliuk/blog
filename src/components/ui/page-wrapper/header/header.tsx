import { type ReactNode, memo } from "react";

import {
  HeaderCenter,
  type HeaderCenterProps,
  HeaderLeft,
  type HeaderLeftProps,
  HeaderRight,
  type HeaderRightProps,
} from "./header-parts";
import { tw } from "blog/utils";

export type HeaderProps = {
  isHeaderShown?: boolean;
  header?: ReactNode;
} & HeaderLeftProps &
  HeaderCenterProps &
  HeaderRightProps;

export const Header = memo(
  ({
    isHeaderShown,
    header,
    headerLeft,
    isHeaderLeftShown,
    headerCenter,
    isHeaderCenterShown,
    headerCenterClassName,
    headerRight,
    isHeaderRightShown,
  }: HeaderProps) => {
    if (!isHeaderShown) return null;
    return header ? (
      <>{header}</>
    ) : (
      <div
        className={tw(
          "sticky top-0 z-50 flex h-24 w-full items-center bg-zinc-700 p-4 desktop:justify-between desktop:py-1 desktop:shadow-[0_8px_16px_1px_rgba(141,141,141,0.12)]"
        )}
      >
        <HeaderLeft
          headerLeft={headerLeft}
          isHeaderLeftShown={isHeaderLeftShown}
        />
        <HeaderCenter
          headerCenter={headerCenter}
          isHeaderCenterShown={isHeaderCenterShown}
          headerCenterClassName={headerCenterClassName}
        />
        <HeaderRight
          headerRight={headerRight}
          isHeaderRightShown={isHeaderRightShown}
        />
      </div>
    );
  }
);
