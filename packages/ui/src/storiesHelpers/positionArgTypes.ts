import { Position } from "../types";

export const positionArgTypes = (prop: string) => ({
  [prop]: {
    control: {
      type: 'select',
      labels: {
        [Position.Start]: 'Start',
        [Position.End]: 'End',
      },
    },
    options: [
      Position.Start,
      Position.End,
    ],
  },
});
