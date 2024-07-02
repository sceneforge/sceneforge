import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { IconEnum, Variant } from "../../types";
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
    ...variantArgumentTypes("variant"),
  },
  component: Card,
  title: "Component/Card",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    actions: [
      {
        kind: "button",
        label: "Open",
        variant: Variant.Default,
      },
      {
        icon: IconEnum.Delete,
        kind: "icon",
        label: "Delete",
        variant: Variant.Danger,
      },
    ],
    children: "Card Content Body",
    img: "https://picsum.photos/seed/random/1200",
    label: "Card Title",
  },
} as Story;
