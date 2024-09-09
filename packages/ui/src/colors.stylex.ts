import * as stylex from "@stylexjs/stylex";

import type { ThemeColorPlacementType } from "./schemas";
import type { VariantType } from "./types";

export const MEDIA_DARK = "@media (prefers-color-scheme: dark)";
export const MEDIA_LIGHT = "@media (prefers-color-scheme: light)";

export const colorVariables = stylex.defineVars({
  "--theme-color-background-accent": {
    default: "#00a98f",
    [MEDIA_DARK]: "#006e50",
    [MEDIA_LIGHT]: "#00a98f",
  },
  "--theme-color-background-danger": {
    default: "#aa2244",
    [MEDIA_DARK]: "#cc2244",
    [MEDIA_LIGHT]: "#aa2244",
  },
  "--theme-color-background-default": {
    default: "#ffffff",
    [MEDIA_DARK]: "#000000",
    [MEDIA_LIGHT]: "#ffffff",
  },
  "--theme-color-background-info": {
    default: "#0066cc",
    [MEDIA_DARK]: "#0044cc",
    [MEDIA_LIGHT]: "#0066cc",
  },
  "--theme-color-background-primary": {
    default: "#86159d",
    [MEDIA_DARK]: "#75048c",
    [MEDIA_LIGHT]: "#86159d",
  },
  "--theme-color-background-success": {
    default: "#009f00",
    [MEDIA_DARK]: "#007f00",
    [MEDIA_LIGHT]: "#009f00",
  },
  "--theme-color-background-warning": {
    default: "#ff9f00",
    [MEDIA_DARK]: "#ff8c00",
    [MEDIA_LIGHT]: "#ff9f00",
  },
  "--theme-color-foreground-accent": {
    default: "#ffffff",
    [MEDIA_DARK]: "#ffffff",
    [MEDIA_LIGHT]: "#ffffff",
  },
  "--theme-color-foreground-danger": {
    default: "#ffffff",
    [MEDIA_DARK]: "#ffffff",
    [MEDIA_LIGHT]: "#ffffff",
  },
  "--theme-color-foreground-default": {
    default: "#000000",
    [MEDIA_DARK]: "#ffffff",
    [MEDIA_LIGHT]: "#000000",
  },
  "--theme-color-foreground-info": {
    default: "#ffffff",
    [MEDIA_DARK]: "#ffffff",
    [MEDIA_LIGHT]: "#ffffff",
  },
  "--theme-color-foreground-primary": {
    default: "#ffffff",
    [MEDIA_DARK]: "#ffffff",
    [MEDIA_LIGHT]: "#ffffff",
  },
  "--theme-color-foreground-success": {
    default: "#ffffff",
    [MEDIA_DARK]: "#ffffff",
    [MEDIA_LIGHT]: "#ffffff",
  },
  "--theme-color-foreground-warning": {
    default: "#000000",
    [MEDIA_DARK]: "#000000",
    [MEDIA_LIGHT]: "#000000",
  },
} as const);

export const backgroundColor = stylex.defineVars({
  alpha05: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 5%, transparent)`,
  alpha10: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 10%, transparent)`,
  alpha15: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 15%, transparent)`,
  alpha20: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 20%, transparent)`,
  alpha25: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 25%, transparent)`,
  alpha30: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 30%, transparent)`,
  alpha35: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 35%, transparent)`,
  alpha40: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 40%, transparent)`,
  alpha45: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 45%, transparent)`,
  alpha50: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 50%, transparent)`,
  alpha55: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 55%, transparent)`,
  alpha60: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 60%, transparent)`,
  alpha65: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 65%, transparent)`,
  alpha70: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 70%, transparent)`,
  alpha75: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 75%, transparent)`,
  alpha80: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 80%, transparent)`,
  alpha85: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 85%, transparent)`,
  alpha90: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 90%, transparent)`,
  alpha95: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} 95%, transparent)`,
  default: colorVariables["--theme-color-background-default"],
});

export const currentColor = stylex.defineVars({
  alpha05: "color-mix(in srgb, currentColor 5%, transparent)",
  alpha10: "color-mix(in srgb, currentColor 10%, transparent)",
  alpha15: "color-mix(in srgb, currentColor 15%, transparent)",
  alpha20: "color-mix(in srgb, currentColor 20%, transparent)",
  alpha25: "color-mix(in srgb, currentColor 25%, transparent)",
  alpha30: "color-mix(in srgb, currentColor 30%, transparent)",
  alpha35: "color-mix(in srgb, currentColor 35%, transparent)",
  alpha40: "color-mix(in srgb, currentColor 40%, transparent)",
  alpha45: "color-mix(in srgb, currentColor 45%, transparent)",
  alpha50: "color-mix(in srgb, currentColor 50%, transparent)",
  alpha55: "color-mix(in srgb, currentColor 55%, transparent)",
  alpha60: "color-mix(in srgb, currentColor 60%, transparent)",
  alpha65: "color-mix(in srgb, currentColor 65%, transparent)",
  alpha70: "color-mix(in srgb, currentColor 70%, transparent)",
  alpha75: "color-mix(in srgb, currentColor 75%, transparent)",
  alpha80: "color-mix(in srgb, currentColor 80%, transparent)",
  alpha85: "color-mix(in srgb, currentColor 85%, transparent)",
  alpha90: "color-mix(in srgb, currentColor 90%, transparent)",
  alpha95: "color-mix(in srgb, currentColor 95%, transparent)",
  default: "currentColor",
});

export const foregroundColor = stylex.defineVars({
  alpha05: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 5%, transparent)`,
  alpha10: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 10%, transparent)`,
  alpha15: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 15%, transparent)`,
  alpha20: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 20%, transparent)`,
  alpha25: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 25%, transparent)`,
  alpha30: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 30%, transparent)`,
  alpha35: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 35%, transparent)`,
  alpha40: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 40%, transparent)`,
  alpha45: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 45%, transparent)`,
  alpha50: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 50%, transparent)`,
  alpha55: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 55%, transparent)`,
  alpha60: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 60%, transparent)`,
  alpha65: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 65%, transparent)`,
  alpha70: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 70%, transparent)`,
  alpha75: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 75%, transparent)`,
  alpha80: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 80%, transparent)`,
  alpha85: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 85%, transparent)`,
  alpha90: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 90%, transparent)`,
  alpha95: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 95%, transparent)`,
  default: colorVariables["--theme-color-foreground-default"],
});

export const foregroundBackgroundColor = stylex.defineVars({
  alpha05: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 5%, ${colorVariables["--theme-color-background-default"]})`,
  alpha10: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 10%, ${colorVariables["--theme-color-background-default"]})`,
  alpha15: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 15%, ${colorVariables["--theme-color-background-default"]})`,
  alpha20: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 20%, ${colorVariables["--theme-color-background-default"]})`,
  alpha25: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 25%, ${colorVariables["--theme-color-background-default"]})`,
  alpha30: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 30%, ${colorVariables["--theme-color-background-default"]})`,
  alpha35: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 35%, ${colorVariables["--theme-color-background-default"]})`,
  alpha40: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 40%, ${colorVariables["--theme-color-background-default"]})`,
  alpha45: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 45%, ${colorVariables["--theme-color-background-default"]})`,
  alpha50: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 50%, ${colorVariables["--theme-color-background-default"]})`,
  alpha55: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 55%, ${colorVariables["--theme-color-background-default"]})`,
  alpha60: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 60%, ${colorVariables["--theme-color-background-default"]})`,
  alpha65: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 65%, ${colorVariables["--theme-color-background-default"]})`,
  alpha70: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 70%, ${colorVariables["--theme-color-background-default"]})`,
  alpha75: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 75%, ${colorVariables["--theme-color-background-default"]})`,
  alpha80: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 80%, ${colorVariables["--theme-color-background-default"]})`,
  alpha85: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 85%, ${colorVariables["--theme-color-background-default"]})`,
  alpha90: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 90%, ${colorVariables["--theme-color-background-default"]})`,
  alpha95: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} 95%, ${colorVariables["--theme-color-background-default"]})`,
  default: colorVariables["--theme-color-foreground-default"],
});

export const themeColors = stylex.create({
  setColorAccent: (color: ThemeColorPlacementType) => ({
    "--theme-color-background-accent": {
      default: color.background?.light,
      [MEDIA_DARK]: color.background?.dark,
      [MEDIA_LIGHT]: color.background?.light,
    },
    "--theme-color-foreground-accent": {
      default: color.foreground?.light,
      [MEDIA_DARK]: color.foreground?.dark,
      [MEDIA_LIGHT]: color.foreground?.light,
    },
  }),
  setColorDanger: (color: ThemeColorPlacementType) => ({
    "--theme-color-background-danger": {
      default: color.background?.light,
      [MEDIA_DARK]: color.background?.dark,
      [MEDIA_LIGHT]: color.background?.light,
    },
    "--theme-color-foreground-danger": {
      default: color.foreground?.light,
      [MEDIA_DARK]: color.foreground?.dark,
      [MEDIA_LIGHT]: color.foreground?.light,
    },
  }),
  setColorInfo: (color: ThemeColorPlacementType) => ({
    "--theme-color-background-info": {
      default: color.background?.light,
      [MEDIA_DARK]: color.background?.dark,
      [MEDIA_LIGHT]: color.background?.light,
    },
    "--theme-color-foreground-info": {
      default: color.foreground?.light,
      [MEDIA_DARK]: color.foreground?.dark,
      [MEDIA_LIGHT]: color.foreground?.light,
    },
  }),
  setColorPrimary: (color: ThemeColorPlacementType) => ({
    "--theme-color-background-primary": {
      default: color.background?.light,
      [MEDIA_DARK]: color.background?.dark,
      [MEDIA_LIGHT]: color.background?.light,
    },
    "--theme-color-foreground-primary": {
      default: color.foreground?.light,
      [MEDIA_DARK]: color.foreground?.dark,
      [MEDIA_LIGHT]: color.foreground?.light,
    },
  }),
  setColorSuccess: (color: ThemeColorPlacementType) => ({
    "--theme-color-background-success": {
      default: color.background?.light,
      [MEDIA_DARK]: color.background?.dark,
      [MEDIA_LIGHT]: color.background?.light,
    },
    "--theme-color-foreground-success": {
      default: color.foreground?.light,
      [MEDIA_DARK]: color.foreground?.dark,
      [MEDIA_LIGHT]: color.foreground?.light,
    },
  }),
  setColorWarning: (color: ThemeColorPlacementType) => ({
    "--theme-color-background-warning": {
      default: color.background?.light,
      [MEDIA_DARK]: color.background?.dark,
      [MEDIA_LIGHT]: color.background?.light,
    },
    "--theme-color-foreground-warning": {
      default: color.foreground?.light,
      [MEDIA_DARK]: color.foreground?.dark,
      [MEDIA_LIGHT]: color.foreground?.light,
    },
  }),
});

export const backgroundStyles = stylex.create({
  default: (opacity: number) => ({
    backgroundColor: `color-mix(in srgb, ${colorVariables["--theme-color-background-default"]} ${opacity}%, transparent)`,
  }),
  defaultInverted: (opacity: number) => ({
    backgroundColor: `color-mix(in srgb, ${colorVariables["--theme-color-foreground-default"]} ${opacity}%, transparent)`,
  }),
  inverted: (variant: VariantType, opacity: number) => ({
    backgroundColor: `color-mix(in srgb, ${colorVariables[`--theme-color-foreground-${variant}`]} ${opacity}%, transparent)`,
  }),
  variant: (variant: VariantType, opacity: number) => ({
    backgroundColor: `color-mix(in srgb, ${colorVariables[`--theme-color-background-${variant}`]} ${opacity}%, transparent)`,
  }),
});

export const textColorStyles = stylex.create({
  default: {
    color: colorVariables["--theme-color-background-default"],
  },
  defaultInverted: {
    color: colorVariables["--theme-color-foreground-default"],
  },
  inverted: (variant: VariantType) => ({
    color: colorVariables[`--theme-color-foreground-${variant}`],
  }),
  variant: (variant: VariantType) => ({
    color: colorVariables[`--theme-color-background-${variant}`],
  }),
});

export const colorStyles = stylex.create({
  background: (variant: VariantType) => ({
    backgroundColor: colorVariables[`--theme-color-background-${variant}`],
  }),
  color: (variant: VariantType) => ({
    color: colorVariables[`--theme-color-background-${variant}`],
  }),
  default: {
    backgroundColor: colorVariables["--theme-color-background-default"],
    color: colorVariables["--theme-color-foreground-default"],
  },
  foreground: (variant: VariantType) => ({
    color: colorVariables[`--theme-color-background-${variant}`],
  }),
  inverted: (variant: VariantType) => ({
    backgroundColor: colorVariables[`--theme-color-foreground-${variant}`],
    color: colorVariables[`--theme-color-background-${variant}`],
  }),
  variant: (variant: VariantType) => ({
    backgroundColor: colorVariables[`--theme-color-background-${variant}`],
    color: colorVariables[`--theme-color-foreground-${variant}`],
  }),
});

export const textShadowStyles = stylex.create({
  default: (size: number) => ({
    textShadow: [
      `${(size * 0.0625)}rem ${(size * 0.0625)}rem ${(size * 3 * 0.0625)}rem ${colorVariables["--theme-color-foreground-default"]}`,
      `${(size * 2 * 0.0625)}rem ${(size * 4 * 0.0625)}rem ${(size * 7 * 0.0625)}rem ${colorVariables["--theme-color-foreground-default"]}`,
    ].join(", "),
  }),
  defaultInverted: (size: number) => ({
    textShadow: [
      `${(size * 0.0625)}rem ${(size * 0.0625)}rem ${(size * 3 * 0.0625)}rem ${colorVariables["--theme-color-background-default"]}`,
      `${(size * 2 * 0.0625)}rem ${(size * 4 * 0.0625)}rem ${(size * 7 * 0.0625)}rem ${colorVariables["--theme-color-background-default"]}`,
    ].join(", "),
  }),
  inverted: (variant: VariantType, size: number) => ({
    textShadow: [
      `${(size * 0.0625)}rem ${(size * 0.0625)}rem ${(size * 3 * 0.0625)}rem ${colorVariables[`--theme-color-background-${variant}`]}`,
      `${(size * 2 * 0.0625)}rem ${(size * 4 * 0.0625)}rem ${(size * 7 * 0.0625)}rem ${colorVariables[`--theme-color-background-${variant}`]}`,
    ].join(", "),
  }),
  variant: (variant: VariantType, size: number) => ({
    textShadow: [
      `${(size * 0.0625)}rem ${(size * 0.0625)}rem ${(size * 3 * 0.0625)}rem ${colorVariables[`--theme-color-foreground-${variant}`]}`,
      `${(size * 2 * 0.0625)}rem ${(size * 4 * 0.0625)}rem ${(size * 7 * 0.0625)}rem ${colorVariables[`--theme-color-foreground-${variant}`]}`,
    ].join(", "),
  }),
});
