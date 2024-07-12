import type { Meta, StoryObj } from "@storybook/react";

import { View } from "@sceneforge/ui";

import { variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof View> = {
  argTypes: {
    children: {
      control: "text",
    },
    margin: {
      control: "number",
    },
    padding: {
      control: "number",
    },
    scrollable: {
      control: "inline-radio",
      options: [true, false, "inline", "block"],
    },
    ...variantArgTypes("variant"),
  },
  component: View,
  title: "@sceneforge|ui/Components/View",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "View Text Content",
  },
};
