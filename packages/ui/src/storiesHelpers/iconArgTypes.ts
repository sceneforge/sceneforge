import type { Args, ArgTypes } from "@storybook/react";

import { IconEnum } from "../types";

export const iconArgTypes = <
  TArgs = Args,
  Arg extends keyof TArgs = keyof TArgs,
  InputType extends ArgTypes<TArgs>[Arg] = ArgTypes<TArgs>[Arg],
>(
  property: Arg,
  input?: Omit<InputType, "control" | "options">
) => ({
  [property]: {
    control: {
      labels: Object.keys(IconEnum).map(key => ({
        [IconEnum[key as keyof typeof IconEnum]]: key,
      }))
        .reduce((accumulator, value) => ({
          ...accumulator,
          ...value,
        }), {
          "": "-- None",
        }),
      type: "select" as const,
    },
    options: [
      "", // This is the default value,
      ...Object.values(IconEnum),
    ],
  },
  ...input,
});
