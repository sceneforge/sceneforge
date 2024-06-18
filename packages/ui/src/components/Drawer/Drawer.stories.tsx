import type { Meta, StoryObj } from "@storybook/react";

import { orientationArgTypes as orientationArgumentTypes, positionArgTypes as positionArgumentTypes, variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { Variant } from "../../types";
import Drawer from "./Drawer";

const meta: Meta<typeof Drawer> = {
  argTypes: {
    children: {
      control: "text",
    },
    label: {
      control: "text",
    },
    resizable: {
      control: "boolean",
    },
    size: {
      control: {
        max: 100,
        min: 1,
        type: "range",
      },
      max: 100,
      min: 1,
    },
    ...variantArgumentTypes("variant"),
    ...orientationArgumentTypes("orientation"),
    ...positionArgumentTypes("position"),
  },
  component: Drawer,
  render: args => (
    <div className="w-100 h-100 outline">
      <Drawer {...args} />
    </div>
  ),
  title: "Component/Drawer",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: (<div style={{ paddingBlock: "1rem", paddingInline: "2rem" }}>Drawer Content</div>),
    label: "Drawer Title",
    resizable: true,
    size: 48,
    variant: Variant.Default,
  },
} as Story;
