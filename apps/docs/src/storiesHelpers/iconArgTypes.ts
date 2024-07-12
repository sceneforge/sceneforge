import { IconEnum } from "@sceneforge/ui";

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
          "": "-- None", // This is the default value
        }),
      type: "select" as const,
    },
    options: [
      "",
      ...Object.values(IconEnum),
    ],
  },
});
