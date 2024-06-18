import { Position } from "../types";

export const positionArgTypes = (property: string) => ({
  [property]: {
    control: {
      labels: {
        [Position.End]: "End",
        [Position.Start]: "Start",
      },
      type: "select",
    },
    options: [
      Position.Start,
      Position.End,
    ],
  },
});
