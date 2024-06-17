import { Orientation } from "../types";

export const orientationArgTypes = (prop: string) => ({
  [prop]: {
    control: {
      type: 'select',
      labels: {
        [Orientation.Horizontal]: 'Horizontal',
        [Orientation.Vertical]: 'Vertical',
      },
    },
    options: [
      Orientation.Horizontal,
      Orientation.Vertical,
    ],
  },
});
