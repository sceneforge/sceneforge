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
    )
  ],
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
