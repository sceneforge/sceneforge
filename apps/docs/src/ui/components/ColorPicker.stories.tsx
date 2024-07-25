import type { Meta, StoryObj } from "@storybook/react";

import { ColorPicker } from "@sceneforge/ui";

import { shapeArgTypes, variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof ColorPicker> = {
  argTypes: {
    dense: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    glossy: {
      control: "boolean",
    },
    inverted: {
      control: "boolean",
    },
    margin: {
      control: "number",
    },
    padding: {
      control: "number",
    },
    scale: {
      control: "boolean",
    },
    ...shapeArgTypes("shape"),
    ...variantArgTypes("variant"),
  },
  component: ColorPicker,
  decorators: [
    Story => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  title: "@sceneforge|ui/Components/ColorPicker",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    label: "Color Picker Label",
    scale: true,
  },
};
