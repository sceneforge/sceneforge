import type { Args, ArgTypes } from "@storybook/react";

import { Position } from "../types";

export const positionArgTypes = <
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
        [Position.End]: "End",
        [Position.Start]: "Start",
      },
      type: "select",
    },
    options: [
      "", // This is the default value
      Position.Start,
      Position.End,
    ],
  },
  ...input,
});
