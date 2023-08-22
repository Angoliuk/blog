import type React from "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function memo<T extends React.ComponentType<any>>(
    Component: T,
    propsAreEqual?: (
      prev: Readonly<React.ComponentProps<T>>,
      next: Readonly<React.ComponentProps<T>>
    ) => boolean
  ): T;
}
