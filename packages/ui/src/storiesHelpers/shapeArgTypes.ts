import { Shape } from "../types";

export const shapeArgTypes = (property: string) => ({
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
});
