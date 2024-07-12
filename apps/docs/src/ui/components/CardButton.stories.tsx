import type { Meta, StoryObj } from "@storybook/react";

import { CardButton } from "@sceneforge/ui";

import { variantArgTypes } from "../../storiesHelpers";

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
    ...variantArgTypes("variant"),
  },
  component: CardButton,
  title: "@sceneforge|ui/Components/CardButton",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Card Button Content",
    img: "https://picsum.photos/seed/green/200",
    label: "Card Button Title",
  },
};
