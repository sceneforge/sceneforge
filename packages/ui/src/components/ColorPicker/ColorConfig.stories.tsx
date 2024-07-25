import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes } from "../../storiesHelpers";
import ColorConfig from "./ColorConfig";

const meta: Meta<typeof ColorConfig> = {
  argTypes: {
    defaultHue: {
      control: {
        max: 360,
        min: 0,
        type: "range",
      },
    },
    defaultLightness: {
      control: {
        max: 100,
        min: 0,
        type: "range",
      },
    },
    defaultSaturation: {
      control: {
        max: 100,
        min: 0,
        type: "range",
      },
    },
    ...variantArgTypes("variant"),
  },
  component: ColorConfig,
  decorators: [
    Story => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  title: "Component/ColorPicker/ColorConfig",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    defaultHue: 0,
  },
};
