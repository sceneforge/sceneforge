import * as stylex from "@stylexjs/stylex";

import { foregroundColor } from "./colors.stylex";

export const scrollShadowBlockAnimation = stylex.keyframes({
  "0%": {
    backgroundPositionY: "-0.5rem, 100%",
  },
  "2%": {
    backgroundPositionY: "-0.125rem, 100%",
  },
  "4%": {
    backgroundPositionY: "0, 100%",
  },
  "96%": {
    backgroundPositionY: "0, 100%",
  },
  "98%": {
    backgroundPositionY: "0, calc(100% + 0.125rem)",
  },
  "100%": {
    backgroundPositionY: "0, calc(100% + 0.5rem)",
  },
});

export const scrollShadowInlineAnimation = stylex.keyframes({
  "0%": {
    backgroundPositionX: "-0.5rem, 100%",
  },
  "2%": {
    backgroundPositionX: "-0.125rem, 100%",
  },
  "4%": {
    backgroundPositionX: "0, 100%",
  },
  "96%": {
    backgroundPositionX: "0, 100%",
  },
  "98%": {
    backgroundPositionX: "0, calc(100% + 0.125rem)",
  },
  "100%": {
    backgroundPositionX: "0, calc(100% + 0.5rem)",
  },
});

export const scrollShadowsStyles = stylex.create({
  block: {
    animationDirection: "alternate",
    animationDuration: "1ms",
    animationFillMode: "both",
    animationName: scrollShadowBlockAnimation,
    animationTimeline: "scroll(block self)",
    backgroundAttachment: "scroll, scroll",
    backgroundImage: [
      `radial-gradient(farthest-side at 50% 0, ${foregroundColor.alpha45}, transparent)`,
      `radial-gradient(farthest-side at 50% 100%, ${foregroundColor.alpha45}, transparent)`,
    ].join(", "),
    backgroundPositionX: "center, center",
    backgroundPositionY: "-0.5rem, calc(100% + 0.5rem)",
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundSize: "100% 0.5rem, 100% 0.5rem",
    isolation: "isolate",
  },
  inline: {
    animationDirection: "alternate",
    animationDuration: "1ms",
    animationFillMode: "both",
    animationName: scrollShadowInlineAnimation,
    animationTimeline: "scroll(inline self)",
    backgroundAttachment: "scroll, scroll",
    backgroundImage: [
      `radial-gradient(farthest-side at 0 50%, ${foregroundColor.alpha45}, transparent)`,
      `radial-gradient(farthest-side at 100% 50%, ${foregroundColor.alpha45}, transparent)`,
    ].join(", "),
    backgroundPositionX: "0, 100%",
    backgroundPositionY: "center, center",
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundSize: "0.5rem 100%, 0.5rem 100%",
    isolation: "isolate",
  },
});
