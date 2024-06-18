import type { StorybookConfig } from "@storybook/react-vite";

import path from "node:path";
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return path.dirname(globalThis.require.resolve(path.join(value, "package.json")));
}

const config: StorybookConfig = {
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  core: {
    builder: "@storybook/builder-vite",
  },
  docs: {
    defaultName: "Documentation",
  },
  framework: {
    name: getAbsolutePath("@storybook/react-vite") as StorybookConfig["framework"] extends { name: infer T } ? T : never,
    options: {},
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");
    const { default: styleX } = await import("vite-plugin-stylex");

    return mergeConfig(config, {
      optimizeDeps: {
        include: [
          "@stylexjs/stylex",
        ],
      },
      plugins: [
        styleX(),
      ],
    });
  },
};

export default config;
