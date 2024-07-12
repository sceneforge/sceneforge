import { Position } from "@sceneforge/ui";

export const positionArgTypes = (property: string) => ({
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
});
