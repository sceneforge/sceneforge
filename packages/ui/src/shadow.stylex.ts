import * as stylex from "@stylexjs/stylex";

import { backgroundColor, foregroundColor } from "./colors.stylex";

export const MEDIA_DARK = "@media (prefers-color-scheme: dark)";

export const shadowStyles = stylex.create({
  default: {
    boxShadow: `0 0.125rem 0.125rem ${foregroundColor.alpha50}`,
  },
  inverted: {
    boxShadow: `0 0.125rem 0.125rem ${backgroundColor.alpha50}`,
  },
});

export const insetShadowStyles = stylex.create({
  default: {
    boxShadow: {
      [MEDIA_DARK]: [
        `inset 0 0.0625rem 0 ${backgroundColor.alpha20}`,
        `inset 0 0.0625rem 0.25rem ${backgroundColor.alpha15}`,
        `inset 0 0.125rem 0.5rem ${backgroundColor.alpha10}`,
        `inset 0 0.25rem 0.25rem ${backgroundColor.alpha05}`,
      ].join(","),
      default: [
        `inset 0 0.0625rem 0 ${foregroundColor.alpha20}`,
        `inset 0 0.0625rem 0.25rem ${foregroundColor.alpha15}`,
        `inset 0 0.125rem 0.5rem ${foregroundColor.alpha10}`,
        `inset 0 0.25rem 0.25rem ${foregroundColor.alpha05}`,
      ].join(","),
    },
  },
  inverted: {
    boxShadow: {
      [MEDIA_DARK]: [
        `inset 0 0.0625rem 0 ${foregroundColor.alpha45}`,
        `inset 0 0.0625rem 0.25rem ${foregroundColor.alpha35}`,
        `inset 0 0.125rem 0.5rem ${foregroundColor.alpha25}`,
        `inset 0 0.25rem 0.25rem ${foregroundColor.alpha15}`,
      ].join(","),
      default: [
        `inset 0 0.0625rem 0 ${backgroundColor.alpha45}`,
        `inset 0 0.0625rem 0.25rem ${backgroundColor.alpha35}`,
        `inset 0 0.125rem 0.5rem ${backgroundColor.alpha25}`,
        `inset 0 0.25rem 0.25rem ${backgroundColor.alpha15}`,
      ].join(","),
    },
  },
});

export const elevationStyles = stylex.create({
  default: (elevation: number) => ({
    boxShadow: `0 ${elevation * 0.0625}rem ${elevation * 0.25}rem ${foregroundColor.alpha50}`,
  }),
  inverted: (elevation: number) => ({
    boxShadow: `0 ${elevation * 0.0625}rem ${elevation * 0.25}rem ${backgroundColor.alpha50}`,
  }),
});

export const insetAndElevationStyles = stylex.create({
  defaultDefault: (elevation: number) => ({
    boxShadow: {
      [MEDIA_DARK]: [
        `0 ${elevation * 0.0625}rem ${elevation * 0.25}rem ${foregroundColor.alpha50}`,
        `inset 0 0.0625rem 0 ${backgroundColor.alpha20}`,
        `inset 0 0.0625rem 0.25rem ${backgroundColor.alpha15}`,
        `inset 0 0.125rem 0.5rem ${backgroundColor.alpha10}`,
        `inset 0 0.25rem 0.25rem ${backgroundColor.alpha05}`,
      ].join(","),
      default: [
        `0 ${elevation * 0.0625}rem ${elevation * 0.25}rem ${foregroundColor.alpha50}`,
        `inset 0 0.0625rem 0 ${foregroundColor.alpha20}`,
        `inset 0 0.0625rem 0.25rem ${foregroundColor.alpha15}`,
        `inset 0 0.125rem 0.5rem ${foregroundColor.alpha10}`,
        `inset 0 0.25rem 0.25rem ${foregroundColor.alpha05}`,
      ].join(","),
    },
  }),
  defaultInverted: (elevation: number) => ({
    boxShadow: {
      [MEDIA_DARK]: [
        `0 ${elevation * 0.0625}rem ${elevation * 0.25}rem ${backgroundColor.alpha50}`,
        `inset 0 0.0625rem 0 ${backgroundColor.alpha20}`,
        `inset 0 0.0625rem 0.25rem ${backgroundColor.alpha15}`,
        `inset 0 0.125rem 0.5rem ${backgroundColor.alpha10}`,
        `inset 0 0.25rem 0.25rem ${backgroundColor.alpha05}`,
      ].join(","),
      default: [
        `0 ${elevation * 0.0625}rem ${elevation * 0.25}rem ${backgroundColor.alpha50}`,
        `inset 0 0.0625rem 0 ${foregroundColor.alpha20}`,
        `inset 0 0.0625rem 0.25rem ${foregroundColor.alpha15}`,
        `inset 0 0.125rem 0.5rem ${foregroundColor.alpha10}`,
        `inset 0 0.25rem 0.25rem ${foregroundColor.alpha05}`,
      ].join(","),
    },
  }),
  invertedDefault: (elevation: number) => ({
    boxShadow: {
      [MEDIA_DARK]: [
        `0 ${elevation * 0.0625}rem ${elevation * 0.25}rem ${foregroundColor.alpha50}`,
        `inset 0 0.0625rem 0 ${foregroundColor.alpha45}`,
        `inset 0 0.0625rem 0.25rem ${foregroundColor.alpha35}`,
        `inset 0 0.125rem 0.5rem ${foregroundColor.alpha25}`,
        `inset 0 0.25rem 0.25rem ${foregroundColor.alpha15}`,
      ].join(","),
      default: [
        `0 ${elevation * 0.0625}rem ${elevation * 0.25}rem ${foregroundColor.alpha50}`,
        `inset 0 0.0625rem 0 ${backgroundColor.alpha45}`,
        `inset 0 0.0625rem 0.25rem ${backgroundColor.alpha35}`,
        `inset 0 0.125rem 0.5rem ${backgroundColor.alpha25}`,
        `inset 0 0.25rem 0.25rem ${backgroundColor.alpha15}`,
      ].join(","),
    },
  }),
  invertedInverted: (elevation: number) => ({
    boxShadow: {
      [MEDIA_DARK]: [
        `0 ${elevation * 0.0625}rem ${elevation * 0.25}rem ${backgroundColor.alpha50}`,
        `inset 0 0.0625rem 0 ${foregroundColor.alpha45}`,
        `inset 0 0.0625rem 0.25rem ${foregroundColor.alpha35}`,
        `inset 0 0.125rem 0.5rem ${foregroundColor.alpha25}`,
        `inset 0 0.25rem 0.25rem ${foregroundColor.alpha15}`,
      ].join(","),
      default: [
        `0 ${elevation * 0.0625}rem ${elevation * 0.25}rem ${backgroundColor.alpha50}`,
        `inset 0 0.0625rem 0 ${backgroundColor.alpha45}`,
        `inset 0 0.0625rem 0.25rem ${backgroundColor.alpha35}`,
        `inset 0 0.125rem 0.5rem ${backgroundColor.alpha25}`,
        `inset 0 0.25rem 0.25rem ${backgroundColor.alpha15}`,
      ].join(","),
    },
  }),
});
