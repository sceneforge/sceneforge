import type { Meta, StoryObj } from "@storybook/react";

import { Section } from "@sceneforge/ui";

const meta: Meta<typeof Section> = {
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
      if: { arg: "title", truthy: true },
      max: 6,
      min: 1,
    },
    shadow: { control: "boolean" },
    title: { control: "text" },
  },
  component: Section,
  title: "@sceneforge|ui/Components/Section",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Section Content",
    level: 1,
    shadow: true,
    title: "Section Title",
  },
};
