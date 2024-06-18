import type { Meta, StoryObj } from "@storybook/react";

import { orientationArgTypes as orientationArgumentTypes, positionArgTypes as positionArgumentTypes, variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { Orientation, Position, Variant } from "../../types";
import DrawerController from "./DrawerController";

const meta: Meta<typeof DrawerController> = {
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
    ...variantArgumentTypes("variant"),
    ...orientationArgumentTypes("orientation"),
    ...positionArgumentTypes("position"),
  },
  component: DrawerController,
  render: args => (
    <div className="w-100 h-100 outline">
      <DrawerController {...args} />
    </div>
  ),
  title: "Component/DrawerController",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: (<div className="p-block-2 p-inline-4">DrawerController Content</div>),
    initialSize: 48,
    label: "DrawerController Title",
    orientation: Orientation.Vertical,
    position: Position.End,
    resizable: true,
    variant: Variant.Accent,
  },
} as Story;
