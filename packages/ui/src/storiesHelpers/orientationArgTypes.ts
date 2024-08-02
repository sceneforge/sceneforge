import type { Args, ArgTypes } from "@storybook/react";

import { Orientation } from "../types";

export const orientationArgTypes = <
  TArgs = Args,
  Arg extends keyof TArgs = keyof TArgs,
  InputType extends ArgTypes<TArgs>[Arg] = ArgTypes<TArgs>[Arg],
>(
  property: Arg,
  input?: Omit<InputType, "control" | "options">
) => ({
  [property]: {
    control: {
      labels: {
        "": "-- None",
        [Orientation.Horizontal]: "Horizontal",
        [Orientation.Vertical]: "Vertical",
      },
      type: "select",
    },
    options: [
      "", // This is the default value
      Orientation.Horizontal,
      Orientation.Vertical,
    ],
  },
  ...input,
});
