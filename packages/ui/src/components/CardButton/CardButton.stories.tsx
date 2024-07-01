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
    label: {
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
    children: (<div>Card Button Content</div>),
    img: "https://picsum.photos/seed/green/200",
    label: "Card Button Title",
  },
} as Story;
