import type { Preview } from "@storybook/react";

import { AppLayout } from "../src";
import "../src/styles/reset.css";
import "./index.css";

const preview: Preview = {
  decorators: [
    (Story, { parameters }) => (
      <>
        <AppLayout embedded>
          <Story {...parameters} />
        </AppLayout>
      </>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
