import type { Preview } from "@storybook/react";

import "../src/styles/reset.css";
import "./index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default preview;
