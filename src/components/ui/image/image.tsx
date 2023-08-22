import { type FC } from "react";

import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { tw } from "blog/utils";

export enum ImageTypes {
  CIRCLE = "circle",
  SMALL_CIRCLE = "small-circle",
  EXTRA_SMALL_CIRCLE = "extra-small-circle",
  MEDIUM_CIRCLE = "medium-circle",
  FULL_SIZE = "full-size",
  CLEAR = "clear",
}

export type ImageProps = NextImageProps & { type?: ImageTypes };

export const Image: FC<ImageProps> = ({ ...props }) => {
  return (
    <NextImage
      {...props}
      className={tw(
        {
          [ImageTypes.CIRCLE]: "h-24 w-24 rounded-full",
          [ImageTypes.SMALL_CIRCLE]: "h-10 w-10 rounded-full",
          [ImageTypes.EXTRA_SMALL_CIRCLE]: "h-6 w-6 rounded-full",
          [ImageTypes.MEDIUM_CIRCLE]: "h-12 w-12 rounded-full",
          [ImageTypes.FULL_SIZE]: "h-full w-full",
          [ImageTypes.CLEAR]: "",
        }[props.type ?? ImageTypes.FULL_SIZE],
        props.className
      )}
    />
  );
};
