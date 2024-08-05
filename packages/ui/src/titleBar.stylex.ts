import * as stylex from "@stylexjs/stylex";

export const MEDIA_WINDOW_CONTROLS_OVERLAY = "@media (display-mode: window-controls-overlay)";

export const titleBar = stylex.defineVars({
  appTitleBarHeight: {
    default: "2.5rem",
    [MEDIA_WINDOW_CONTROLS_OVERLAY]: "env(titlebar-area-height, 2.5rem)",
  },
  appTitleBarInsetBlockStart: {
    default: 0,
    [MEDIA_WINDOW_CONTROLS_OVERLAY]: "env(titlebar-area-y, 0)",
  },
  appTitleBarInsetInlineStart: {
    default: 0,
    [MEDIA_WINDOW_CONTROLS_OVERLAY]: "env(titlebar-area-x, 0)",
  },
  appTitleBarWidth: {
    default: "100%",
    [MEDIA_WINDOW_CONTROLS_OVERLAY]: "env(titlebar-area-width, 100%)",
  },
});

export const appRegionStyles = stylex.create({
  drag: {
    "-webkit-app-region": {
      default: null,
      [MEDIA_WINDOW_CONTROLS_OVERLAY]: "drag",
    },
    "app-region": {
      default: null,
      [MEDIA_WINDOW_CONTROLS_OVERLAY]: "drag",
    },
  } as Record<string, {
    default: null;
    [MEDIA_WINDOW_CONTROLS_OVERLAY]: string;
  }>,
  noDrag: {
    "-webkit-app-region": {
      default: null,
      [MEDIA_WINDOW_CONTROLS_OVERLAY]: "no-drag",
    },
    "app-region": {
      default: null,
      [MEDIA_WINDOW_CONTROLS_OVERLAY]: "no-drag",
    },
  } as Record<string, {
    default: null;
    [MEDIA_WINDOW_CONTROLS_OVERLAY]: string;
  }>,
});
