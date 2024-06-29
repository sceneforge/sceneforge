import type { Preview } from "@storybook/react";

import "../src/styles/reset.css";
import "./index.css";

const preview: Preview = {
  decorators: [
    Story => (
      <>
        <div
          style={{
            alignContent: "center",
            backgroundAttachment: "fixed",
            backgroundBlendMode: "screen",
            backgroundColor: "color-mix(in srgb, Canvas 10%, transparent)",
            backgroundImage: "conic-gradient(from 0deg, #ffadad, #ffd6a5, #fdffb6, #caffbf, #9bf6ff, #a0c4ff, #bdb2ff, #ffc6ff, #ffadad)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            filter: "blur(1.5rem) brightness(1.1)",
            inset: 0,
            overflow: "hidden",
            position: "absolute",
            textAlign: "center",
            zIndex: -1,
          }}
        />
        <Story />
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
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default preview;
