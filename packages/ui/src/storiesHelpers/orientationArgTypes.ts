import { Orientation } from "../types";

export const orientationArgTypes = (property: string) => ({
  [property]: {
    control: {
      labels: {
        [Orientation.Horizontal]: "Horizontal",
        [Orientation.Vertical]: "Vertical",
      },
      type: "select",
    },
    options: [
      Orientation.Horizontal,
      Orientation.Vertical,
    ],
  },
});
