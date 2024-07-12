import type { Meta, StoryObj } from "@storybook/react";

import { Blockquote } from "@sceneforge/ui";

import { variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof Blockquote> = {
  argTypes: {
    children: {
      control: "text",
    },
    ...variantArgTypes("variant"),
  },
  component: Blockquote,
  title: "@sceneforge|ui/Components/Blockquote",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Blockquote Content",
    title: "Blockquote Title",
  },
};
