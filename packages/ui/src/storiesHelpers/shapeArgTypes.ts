import type { ArgTypes, Args } from "@storybook/react";

import { Shape } from "../types";

export const shapeArgTypes = <
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
        [Shape.Circle]: "Circle",
        [Shape.Pill]: "Pill",
        [Shape.Rectangle]: "Rectangle",
        [Shape.Rounded]: "Rounded",
        [Shape.Squircle]: "Squircle",
      },
      type: "select",
    },
    options: [
      "", // This is the default value
      Shape.Circle,
      Shape.Pill,
      Shape.Rectangle,
      Shape.Rounded,
      Shape.Squircle,
    ],
  },
  ...input,
});
