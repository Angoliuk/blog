import { extendTailwindMerge } from "tailwind-merge";

export const tw = extendTailwindMerge({});

export type ClassNameValue = Parameters<typeof tw>[number];
