import type { ArgTypes, Args } from "@storybook/react";

import { Align } from "@sceneforge/ui";

export const alignArgTypes = <
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
        "": "-- None", // This is the default value
        [Align.Center]: "Center",
        [Align.End]: "End",
        [Align.Start]: "Start",
      },
      type: "select",
    },
    options: [
      "",
      Align.Start,
      Align.Center,
      Align.End,
    ],
    ...input,
  },
});
