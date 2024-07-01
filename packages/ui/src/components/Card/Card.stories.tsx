import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Card from "./Card";

const meta: Meta<typeof Card> = {
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
  component: Card,
  title: "Component/Card",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: (<div className="p-block-2 p-inline-4">Card Content</div>),
    img: "https://picsum.photos/seed/random/1200",
    label: "Card Title",
  },
} as Story;
