import type { Meta, StoryObj } from "@storybook/react";

import HueSlider from "./HueSlider";

const meta: Meta<typeof HueSlider> = {
  argTypes: {
    defaultHue: {
      control: {
        max: 360,
        min: 0,
        type: "range",
      },
    },
  },
  component: HueSlider,
  decorators: [
    Story => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  title: "Component/ColorPicker/HueSlider",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    defaultHue: 0,
  },
};
