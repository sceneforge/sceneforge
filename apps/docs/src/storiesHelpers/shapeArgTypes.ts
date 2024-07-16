import { Shape } from "@sceneforge/ui";

export const shapeArgTypes = (property: string) => ({
  [property]: {
    control: {
      labels: {
        "": "-- None",
        [Shape.Circle]: "Circle",
        [Shape.Rounded]: "Rounded",
        [Shape.Square]: "Square",
        [Shape.Squircle]: "Squircle",
      },
      type: "select",
    },
    options: [
      "", // This is the default value
      Shape.Circle,
      Shape.Square,
      Shape.Rounded,
      Shape.Squircle,
    ],
  },
});
