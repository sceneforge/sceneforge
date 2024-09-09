import type { StorybookConfig } from "@storybook/react-vite";

// import path from "node:path";
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
// function getAbsolutePath(value: string) {
//   // eslint-disable-next-line unicorn/prefer-module
//   return path.dirname(require.resolve(path.join(value, "package.json")));
// }

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  core: {
    builder: "@storybook/builder-vite",
    // crossOriginIsolated: true,
    disableWhatsNewNotifications: true,
  },
  docs: {
    defaultName: "Documentation",
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: [
    {
      from: "../public/assets",
      to: "/assets",
    },
  ],
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
