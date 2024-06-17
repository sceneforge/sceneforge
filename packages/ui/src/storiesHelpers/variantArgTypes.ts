import { Variant } from "../types";

export const variantArgTypes = (prop: string) => ({
  [prop]: {
    control: {
      type: 'select',
      labels: {
        "": '-- None',
        [Variant.Default]: 'Default',
        [Variant.Accent]: 'Accent',
        [Variant.Danger]: 'Danger',
        [Variant.Info]: 'Info',
        [Variant.Success]: 'Success',
        [Variant.Warning]: 'Warning',
      }
    },
    options: [
      "", // This is the default value
      Variant.Default,
      Variant.Accent,
      Variant.Danger,
      Variant.Info,
      Variant.Success,
      Variant.Warning,
    ],
  }
});
