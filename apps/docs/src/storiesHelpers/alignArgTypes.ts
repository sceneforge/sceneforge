import { Align } from "@sceneforge/ui";

export const alignArgTypes = (property: string) => ({
  [property]: {
    control: {
      labels: {
        [Align.Center]: "Center",
        [Align.End]: "End",
        [Align.Start]: "Start",
      },
      type: "select",
    },
    options: [
      Align.Start,
      Align.Center,
      Align.End,
    ],
  },
});
