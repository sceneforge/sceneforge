import { Orientation } from "../types";

export const orientationArgTypes = (property: string) => ({
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
});
