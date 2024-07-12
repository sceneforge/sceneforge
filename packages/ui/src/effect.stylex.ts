import * as stylex from "@stylexjs/stylex";

import type { VariantType } from "./types";

import { colorVariables } from "./colors.stylex";

export const effects = stylex.create({
  glossy: (variant: VariantType) => ({
    backgroundColor: `color-mix(in srgb, ${String(colorVariables[`--theme-color-background-${variant}`])} 85%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
    borderBlockEndColor: `color-mix(in srgb, ${String(colorVariables[`--theme-color-foreground-${variant}`])} 25%, ${colorVariables[`--theme-color-background-${variant}`]})`,
    boxShadow: [
      `inset 0 1.25rem 0.75rem 0.25rem color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} 55%, transparent)`,
      `inset 0 -0.75rem 1rem 0.75rem color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} 15%, transparent)`,
      `inset 0 0.125rem 0.5rem 0.25rem color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} 20%, transparent)`,
    ].join(", "),
    color: colorVariables[`--theme-color-foreground-${variant}`],
    textShadow: `0.125rem 0.125rem 0.25rem color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} 50%, transparent)`,
  }),
  glossyInteractive: (variant: VariantType) => ({
    backgroundColor: `color-mix(in srgb, ${String(colorVariables[`--theme-color-background-${variant}`])} 85%, ${colorVariables[`--theme-color-foreground-${variant}`]})`,
    borderBlockEndColor: `color-mix(in srgb, ${String(colorVariables[`--theme-color-foreground-${variant}`])} 25%, ${colorVariables[`--theme-color-background-${variant}`]})`,
    boxShadow: {
      ":active": `0 0 0.2rem ${String(colorVariables[`--theme-color-foreground-${variant}`])}`,
      ":focus-visible": `0 0 0.1rem ${String(colorVariables[`--theme-color-foreground-${variant}`])}`,
      ":has(+ :popover-open)": `0 0 0.2rem ${String(colorVariables[`--theme-color-foreground-${variant}`])}`,
      "default": [
        `inset 0 1.25rem 0.75rem 0.25rem color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} 55%, transparent)`,
        `inset 0 -0.75rem 1rem 0.75rem color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} 15%, transparent)`,
        `inset 0 0.125rem 0.5rem 0.25rem color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} 20%, transparent)`,
      ].join(", "),
    },
    color: colorVariables[`--theme-color-foreground-${variant}`],
    textShadow: `0.125rem 0.125rem 0.25rem color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} 50%, transparent)`,
  }),
  glossyInverted: (variant: VariantType) => ({
    backgroundColor: `color-mix(in srgb, ${String(colorVariables[`--theme-color-foreground-${variant}`])} 85%, ${colorVariables[`--theme-color-background-${variant}`]})`,
    borderBlockEndColor: `color-mix(in srgb, ${String(colorVariables[`--theme-color-foreground-${variant}`])} 25%, ${colorVariables[`--theme-color-background-${variant}`]})`,
    boxShadow:
      [
        `inset 0 1.25rem 0.75rem 0.25rem color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} 55%, transparent)`,
        `inset 0 -0.75rem 1rem 0.75rem color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} 15%, transparent)`,
        `inset 0 0.125rem 0.5rem 0.25rem color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} 20%, transparent)`,
      ].join(", "),
    color: colorVariables[`--theme-color-background-${variant}`],
    textShadow: `0.125rem 0.125rem 0.25rem color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} 50%, transparent)`,
  }),
  glossyInvertedInteractive: (variant: VariantType) => ({
    backgroundColor: `color-mix(in srgb, ${String(colorVariables[`--theme-color-foreground-${variant}`])} 85%, ${colorVariables[`--theme-color-background-${variant}`]})`,
    borderBlockEndColor: `color-mix(in srgb, ${String(colorVariables[`--theme-color-foreground-${variant}`])} 25%, ${colorVariables[`--theme-color-background-${variant}`]})`,
    boxShadow: {
      ":active": `0 0 0.2rem ${String(colorVariables[`--theme-color-background-${variant}`])}`,
      ":focus-visible": `0 0 0.1rem ${String(colorVariables[`--theme-color-background-${variant}`])}`,
      ":has(+ :popover-open)": `0 0 0.2rem ${String(colorVariables[`--theme-color-background-${variant}`])}`,
      "default":
        [
          `inset 0 1.25rem 0.75rem 0.25rem color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} 55%, transparent)`,
          `inset 0 -0.75rem 1rem 0.75rem color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} 15%, transparent)`,
          `inset 0 0.125rem 0.5rem 0.25rem color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} 20%, transparent)`,
        ].join(", "),
    },
    color: colorVariables[`--theme-color-background-${variant}`],
    textShadow: `0.125rem 0.125rem 0.25rem color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} 50%, transparent)`,
  }),
});
