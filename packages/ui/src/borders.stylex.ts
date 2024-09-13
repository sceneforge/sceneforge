import * as stylex from "@stylexjs/stylex";

import type { VariantType } from "./types";

import { colorVariables } from "./colors.stylex";

export const borderStyles = stylex.create({
  border: {
    borderBlockEndStyle: "solid",
    borderBlockStartStyle: "solid",
    borderInlineEndStyle: "solid",
    borderInlineStartStyle: "solid",
  },
  borderBlock: {
    borderBlockEndStyle: "solid",
    borderBlockStartStyle: "solid",
  },
  borderBlockCurrentColor: (opacity: number) => ({
    borderBlockEndColor: `color-mix(in srgb, currentColor ${opacity}%, transparent)`,
    borderBlockStartColor: `color-mix(in srgb, currentColor ${opacity}%, transparent)`,
  }),
  borderBlockDefault: (opacity: number) => ({
    borderBlockEndColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, ${colorVariables["--theme-color-background-default"]})`,
    borderBlockStartColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, ${colorVariables["--theme-color-background-default"]})`,
  }),
  borderBlockEnd: {
    borderBlockEndStyle: "solid",
  },
  borderBlockEndCurrentColor: (opacity: number) => ({
    borderBlockEndColor: `color-mix(in srgb, currentColor ${opacity}%, transparent)`,
  }),
  borderBlockEndDefault: (opacity: number) => ({
    borderBlockEndColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, ${colorVariables["--theme-color-background-default"]})`,
  }),
  borderBlockEndInverted: (variant: VariantType, opacity: number) => ({
    borderBlockEndColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-background-${variant}`]})`,
  }),
  borderBlockEndSize: (size: number) => ({
    borderBlockEndWidth: (size * 0.0625) + "rem",
  }),
  borderBlockEndVariant: (variant: VariantType, opacity: number) => ({
    borderBlockEndColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
  }),
  borderBlockInverted: (variant: VariantType, opacity: number) => ({
    borderBlockEndColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-background-${variant}`]})`,
    borderBlockStartColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-background-${variant}`]})`,
  }),
  borderBlockSize: (size: number) => ({
    borderBlockEndWidth: (size * 0.0625) + "rem",
    borderBlockStartWidth: (size * 0.0625) + "rem",
  }),
  borderBlockStart: {
    borderBlockStartStyle: "solid",
  },
  borderBlockStartCurrentColor: (opacity: number) => ({
    borderBlockStartColor: `color-mix(in srgb, currentColor ${opacity}%, transparent)`,
  }),
  borderBlockStartDefault: (opacity: number) => ({
    borderBlockStartColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, ${colorVariables["--theme-color-background-default"]})`,
  }),
  borderBlockStartInverted: (variant: VariantType, opacity: number) => ({
    borderBlockStartColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-background-${variant}`]})`,
  }),
  borderBlockStartSize: (size: number) => ({
    borderBlockStartWidth: (size * 0.0625) + "rem",
  }),
  borderBlockStartVariant: (variant: VariantType, opacity: number) => ({
    borderBlockStartColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
  }),
  borderBlockVariant: (variant: VariantType, opacity: number) => ({
    borderBlockEndColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
    borderBlockStartColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
  }),
  borderCurrentColor: (opacity: number) => ({
    borderBlockEndColor: `color-mix(in srgb, currentColor, ${opacity}%, transparent)`,
    borderBlockStartColor: `color-mix(in srgb, currentColor, ${opacity}%, transparent)`,
    borderInlineEndColor: `color-mix(in srgb, currentColor, ${opacity}%, transparent)`,
    borderInlineStartColor: `color-mix(in srgb, currentColor, ${opacity}%, transparent)`,
  }),
  borderDefault: (opacity: number) => ({
    borderBlockEndColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, ${colorVariables["--theme-color-background-default"]})`,
    borderBlockStartColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, ${colorVariables["--theme-color-background-default"]})`,
    borderInlineEndColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, ${colorVariables["--theme-color-background-default"]})`,
    borderInlineStartColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, ${colorVariables["--theme-color-background-default"]})`,
  }),
  borderInline: {
    borderInlineEndStyle: "solid",
    borderInlineStartStyle: "solid",
  },
  borderInlineCurrentColor: (opacity: number) => ({
    borderInlineEndColor: `color-mix(in srgb, currentColor ${opacity}%, transparent)`,
    borderInlineStartColor: `color-mix(in srgb, currentColor ${opacity}%, transparent)`,
  }),
  borderInlineDefault: (opacity: number) => ({
    borderInlineEndColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, ${colorVariables["--theme-color-background-default"]})`,
    borderInlineStartColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, ${colorVariables["--theme-color-background-default"]})`,
  }),
  borderInlineEnd: {
    borderInlineEndStyle: "solid",
  },
  borderInlineEndCurrentColor: (opacity: number) => ({
    borderInlineEndColor: `color-mix(in srgb, currentColor ${opacity}%, transparent)`,
  }),
  borderInlineEndDefault: (opacity: number) => ({
    borderInlineEndColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, ${colorVariables["--theme-color-background-default"]})`,
  }),
  borderInlineEndInverted: (variant: VariantType, opacity: number) => ({
    borderInlineEndColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-background-${variant}`]})`,
  }),
  borderInlineEndSize: (size: number) => ({
    borderInlineEndWidth: (size * 0.0625) + "rem",
  }),
  borderInlineEndVariant: (variant: VariantType, opacity: number) => ({
    borderInlineEndColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
  }),
  borderInlineInverted: (variant: VariantType, opacity: number) => ({
    borderInlineEndColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-background-${variant}`]})`,
    borderInlineStartColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-background-${variant}`]})`,
  }),
  borderInlineSize: (size: number) => ({
    borderInlineEndWidth: (size * 0.0625) + "rem",
    borderInlineStartWidth: (size * 0.0625) + "rem",
  }),
  borderInlineStart: {
    borderInlineStartStyle: "solid",
  },
  borderInlineStartCurrentColor: (opacity: number) => ({
    borderInlineStartColor: `color-mix(in srgb, currentColor ${opacity}%, transparent)`,
  }),
  borderInlineStartDefault: (opacity: number) => ({
    borderInlineStartColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, ${colorVariables["--theme-color-background-default"]})`,
  }),
  borderInlineStartInverted: (variant: VariantType, opacity: number) => ({
    borderInlineStartColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-background-${variant}`]})`,
  }),
  borderInlineStartSize: (size: number) => ({
    borderInlineStartWidth: (size * 0.0625) + "rem",
  }),
  borderInlineStartVariant: (variant: VariantType, opacity: number) => ({
    borderInlineStartColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
  }),
  borderInlineVariant: (variant: VariantType, opacity: number) => ({
    borderInlineEndColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
    borderInlineStartColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
  }),
  borderInverted: (variant: VariantType, opacity: number) => ({
    borderBlockEndColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-background-${variant}`]})`,
    borderBlockStartColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-background-${variant}`]})`,
    borderInlineEndColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-background-${variant}`]})`,
    borderInlineStartColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-background-${variant}`]})`,
  }),
  borderSize: (size: number) => ({
    borderBlockEndWidth: (size * 0.0625) + "rem",
    borderBlockStartWidth: (size * 0.0625) + "rem",
    borderInlineEndWidth: (size * 0.0625) + "rem",
    borderInlineStartWidth: (size * 0.0625) + "rem",
  }),
  borderVariant: (variant: VariantType, opacity: number) => ({
    borderBlockEndColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
    borderBlockStartColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
    borderInlineEndColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
    borderInlineStartColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
  }),
  noBorder: {
    borderBlockEndStyle: "none",
    borderBlockStartStyle: "none",
    borderInlineEndStyle: "none",
    borderInlineStartStyle: "none",
  },
  noOutline: {
    outlineStyle: "none",
  },
  outline: {
    outlineStyle: "solid",
  },
  outlineCurrentColor: (opacity: number) => ({
    outlineColor: `color-mix(in srgb, currentColor ${opacity}%, transparent)`,
  }),
  outlineDefault: (opacity: number) => ({
    outlineColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, ${colorVariables["--theme-color-background-default"]})`,
  }),
  outlineInverted: (variant: VariantType, opacity: number) => ({
    outlineColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-background-${variant}`]})`,
  }),
  outlineOffset: (size: number) => ({
    outlineOffset: (size * 0.0625) + "rem",
  }),
  outlineSize: (size: number) => ({
    outlineWidth: (size * 0.0625) + "rem",
  }),
  outlineVariant: (variant: VariantType, opacity: number) => ({
    outlineColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
  }),
});

export const roundedStyles = stylex.create({
  circle: {
    alignContent: "center",
    aspectRatio: 1,
    borderEndEndRadius: "100vh",
    borderEndStartRadius: "100vh",
    borderStartEndRadius: "100vh",
    borderStartStartRadius: "100vh",
    textAlign: "center",
  },
  endEnd: (size: number) => ({
    borderEndEndRadius: (size * 0.25) + "rem",
  }),
  endStart: (size: number) => ({
    borderEndStartRadius: (size * 0.25) + "rem",
  }),
  noRounded: {
    borderEndEndRadius: 0,
    borderEndStartRadius: 0,
    borderStartEndRadius: 0,
    borderStartStartRadius: 0,
  },
  pill: {
    alignContent: "center",
    borderEndEndRadius: "100vh",
    borderEndStartRadius: "100vh",
    borderStartEndRadius: "100vh",
    borderStartStartRadius: "100vh",
    textAlign: "center",
  },
  rounded: (size: number) => ({
    borderEndEndRadius: (size * 0.25) + "rem",
    borderEndStartRadius: (size * 0.25) + "rem",
    borderStartEndRadius: (size * 0.25) + "rem",
    borderStartStartRadius: (size * 0.25) + "rem",
  }),
  roundedBlockEnd: (size: number) => ({
    borderEndEndRadius: (size * 0.25) + "rem",
    borderEndStartRadius: (size * 0.25) + "rem",
  }),
  roundedBlockStart: (size: number) => ({
    borderStartEndRadius: (size * 0.25) + "rem",
    borderStartStartRadius: (size * 0.25) + "rem",
  }),
  roundedInlineEnd: (size: number) => ({
    borderEndEndRadius: (size * 0.25) + "rem",
    borderStartEndRadius: (size * 0.25) + "rem",
  }),
  roundedInlineStart: (size: number) => ({
    borderEndStartRadius: (size * 0.25) + "rem",
    borderStartStartRadius: (size * 0.25) + "rem",
  }),
  squircle: {
    alignContent: "center",
    aspectRatio: "1 / 1",
    maskImage: "url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDAsIDUwIEMgMCwgNiA2LCAwIDUwLCAwIFMgMTAwLCA2IDEwMCwgNTAgOTQsIDEwMCA1MCwgMTAwIDAsIDk0IDAsIDUwIFoiIC8+PC9zdmc+)",
    maskPosition: "center center",
    maskRepeat: "no-repeat",
    maskSize: "auto auto",
    maskType: "alpha",
    textAlign: "center",
  },
  startEnd: (size: number) => ({
    borderStartEndRadius: (size * 0.25) + "rem",
  }),
  startStart: (size: number) => ({
    borderStartStartRadius: (size * 0.25) + "rem",
  }),
});
