import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "@sceneforge/ui";

const meta: Meta<typeof Heading> = {
  argTypes: {
    children: {
      control: "text",
    },
    level: {
      control: {
        max: 6,
        min: 1,
        type: "range",
      },
      max: 6,
      min: 1,
    },
  },
  component: Heading,
  title: "@sceneforge|ui/Components/Heading",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Heading Text Content",
    level: 1,
  },
};
