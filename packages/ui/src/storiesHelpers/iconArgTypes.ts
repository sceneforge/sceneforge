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
        }), {}),
      type: "select",
    },
    options: Object.values(IconEnum),
  },
});
