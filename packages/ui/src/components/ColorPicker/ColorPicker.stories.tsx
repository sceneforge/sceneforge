import type { Meta, StoryObj } from "@storybook/react";

import { shapeArgTypes, variantArgTypes } from "../../storiesHelpers";
import ColorPicker from "./ColorPicker";

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
  title: "Component/ColorPicker",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    label: "Color Picker Label",
    scale: true,
  },
};
