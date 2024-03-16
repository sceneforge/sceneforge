import { defineConfig } from "unocss";
import presetUno from "@unocss/preset-uno";
import presetTypography from "@unocss/preset-typography";
import transformerDirectives from "@unocss/transformer-directives";
import presetIcons from "@unocss/preset-icons/browser";
import { safeList } from "./src/lib/safeList";

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
    presetTypography(),
    presetIcons({
      collections: {
        "material-symbols": () =>
          import("@iconify-json/material-symbols/icons.json").then(
            (i) => i.default as any
          ),
        "material-symbols-light": () =>
          import("@iconify-json/material-symbols-light/icons.json").then(
            (i) => i.default as any
          ),
        mdi: () =>
          import("@iconify-json/mdi/icons.json").then((i) => i.default),
      },
    }),
  ],
  transformers: [transformerDirectives()],
  safelist: [
    ...safeList(
      [...Object.keys(colors), "white", "black", "dark", "light"],
      [10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 85, 90, 95]
    ),
  ],
  theme: {
    colors,
  },
});
