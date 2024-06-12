import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname } from "path";
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  core: {
    builder: "@storybook/builder-vite",
  },
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions")
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {
    defaultName: "Documentation",
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");
    const { default: styleX } = await import("vite-plugin-stylex");

    return mergeConfig(config, {
      plugins: [
        styleX(),
      ],
      optimizeDeps: {
        include: [
          "@stylexjs/stylex",
        ],
      }
    });
  },
};

export default config;
