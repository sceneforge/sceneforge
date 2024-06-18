import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import CardButton from "./CardButton";

const meta: Meta<typeof CardButton> = {
  argTypes: {
    children: {
      control: "text",
    },
    img: {
      control: "text",
    },
    title: {
      control: "text",
    },
    zoom: {
      control: {
        max: 4,
        min: 0,
        type: "range",
      },
      if: { arg: "img", truthy: true },
      max: 4,
      min: 0,
    },
    ...variantArgumentTypes("variant"),
  },
  component: CardButton,
  title: "Component/CardButton",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: (<div className="p-block-2 p-inline-4">Card Button Content</div>),
    img: "https://picsum.photos/seed/green/200",
    title: "Card Button Title",
  },
  render: args => (
    <div className="w-100 p-10 hover:ring:10 rounded-2xl">
      <CardButton {...args} />
    </div>
  ),
} as Story;
