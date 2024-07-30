import type { ArgTypes, Args } from "@storybook/react";

import { Variant } from "../types";

export const variantArgTypes = <
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
        [Variant.Accent]: "Accent",
        [Variant.Danger]: "Danger",
        [Variant.Info]: "Info",
        [Variant.Primary]: "Primary",
        [Variant.Success]: "Success",
        [Variant.Warning]: "Warning",
      },
      type: "select",
    },
    options: [
      "", // This is the default value
      Variant.Accent,
      Variant.Danger,
      Variant.Info,
      Variant.Primary,
      Variant.Success,
      Variant.Warning,
    ],
    ...input,
  },
});
