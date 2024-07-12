import type { Meta, StoryObj } from "@storybook/react";

import { Card, IconEnum, Variant } from "@sceneforge/ui";

import { variantArgTypes } from "../../storiesHelpers";

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
    ...variantArgTypes("variant"),
  },
  component: Card,
  title: "@sceneforge|ui/Components/Card",
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
};
