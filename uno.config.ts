import { defineConfig } from "unocss";
import presetUno from "@unocss/preset-uno";
import presetTypography from "@unocss/preset-typography";
import transformerDirectives from "@unocss/transformer-directives";
import presetIcons from "@unocss/preset-icons/browser";
import presetAnimations from "unocss-preset-animations";
import { safeList } from "./lib/safeList";
import { type IconifyJSON } from "@iconify/types";

const colors = {
  primary: "#86159d",
  accent: "rgb(0 110 80 / 1)",
  danger: "rgb(179 15 15 / 1)",
  warning: "rgb(209 165 18 / 1)",
  success: "rgb(19 172 19 / 1)",
  info: "rgb(28 69 173 / 1)",
};

export default defineConfig({
  content: {
    pipeline: {
      include: [
        // the default
        /\.([jt]sx|mdx?|html?)($|\?)/,
        "src/**/*.{js,ts,jsx,tsx,md,mdx}",
      ],
    },
  },
  presets: [
    presetUno({
      dark: "media",
    }),
    presetAnimations(),
    presetTypography(),
    presetIcons({
      collections: {
        "material-symbols": () =>
          import("@iconify-json/material-symbols/icons.json").then(
            (i) => i.default as IconifyJSON,
          ),
        "material-symbols-light": () =>
          import("@iconify-json/material-symbols-light/icons.json").then(
            (i) => i.default as IconifyJSON,
          ),
      },
    }),
  ],
  transformers: [transformerDirectives()],
  safelist: [
    ..."animate-in zoom-in-1/2 h-full flex-shrink cursor-pointer rounded-5 b-none children:inline-block".split(
      " ",
    ),
    ..."w-25 min-w-25 h-25 min-h-25".split(" "),
    ..."backdrop:bg-accent:10 backdrop:backdrop-blur-2 backdrop:backdrop-grayscale-60 backdrop:backdrop-filter backdrop:w-full backdrop:h-full".split(
      " ",
    ),
    ..."max-h-10 flex flex-row items-center justify-stretch b-b-1 b-t-1 b-b-black:25 b-t-white:25 b-b-solid b-t-solid p-2 p-r-8 c-light dark:bg-black:15 light:bg-white:15 sm:p-r-0".split(
      " ",
    ),
    ...safeList(
      [...Object.keys(colors), "white", "black", "dark", "light"],
      [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 85, 90, 95],
    ),
  ],
  theme: {
    colors,
  },
});
