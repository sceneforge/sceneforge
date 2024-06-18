import type { Meta, StoryObj } from "@storybook/react";

import Section from "./Section";

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
    title: { control: "text" },
  },
  component: Section,
  render: (args) => {
    return (
      <div className="bg-primary:45 h-full w-full p-2xl">
        <Section {...args} />
      </div>
    );
  },
  title: "Component/Section",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Section Content",
    level: 1,
    title: "Section Title",
  },
} as Story;
