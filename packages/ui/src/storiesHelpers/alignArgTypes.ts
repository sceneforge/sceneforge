import { Align } from "../types";

export const alignArgTypes = (prop: string) => ({
  [prop]: {
    control: {
      type: 'select',
      labels: {
        [Align.Start]: 'Start',
        [Align.Center]: 'Center',
        [Align.End]: 'End',
      },
    },
    options: [
      Align.Start,
      Align.Center,
      Align.End,
    ],
  },
});
