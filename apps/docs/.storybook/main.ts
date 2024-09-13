import type { StorybookConfig } from "@storybook/react-vite";

import path from "node:path";

function getAbsolutePath(value: string) {
  // eslint-disable-next-line unicorn/prefer-module
  return path.dirname(require.resolve(path.join(value, "package.json")));
}

const config: StorybookConfig = {
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  core: {
    builder: getAbsolutePath("@storybook/builder-vite"),
    // crossOriginIsolated: true,
    disableWhatsNewNotifications: true,
  },
  docs: {
    defaultName: "Documentation",
  },
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
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

    return mergeConfig(config, {
      optimizeDeps: {},
    });
  },
};

export default config;
