import { IconEnum } from "../types";

export const iconArgTypes = (property: string) => ({
  [property]: {
    control: {
      labels: Object.keys(IconEnum).map(key => ({
        [IconEnum[key as keyof typeof IconEnum]]: key,
      }))
        .reduce((accumulator, value) => ({
          ...accumulator,
          ...value,
        }), {
          "": "-- None",
        }),
      type: "select" as const,
    },
    options: [
      "", // This is the default value,
      ...Object.values(IconEnum),
    ],
  },
});
