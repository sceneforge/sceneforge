import { Variant } from "../types";

export const variantArgTypes = (property: string) => ({
  [property]: {
    control: {
      labels: {
        "": "-- None",
        [Variant.Accent]: "Accent",
        [Variant.Danger]: "Danger",
        [Variant.Default]: "Default",
        [Variant.Info]: "Info",
        [Variant.Primary]: "Primary",
        [Variant.Success]: "Success",
        [Variant.Warning]: "Warning",
      },
      type: "select",
    },
    options: [
      "", // This is the default value
      Variant.Default,
      Variant.Accent,
      Variant.Danger,
      Variant.Info,
      Variant.Primary,
      Variant.Success,
      Variant.Warning,
    ],
  },
});
