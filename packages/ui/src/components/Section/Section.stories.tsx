import type { Meta, StoryObj } from '@storybook/react';
import Section from './Section';

const meta: Meta<typeof Section> = {
  title: 'Component/Section',
  component: Section,
  argTypes: {
    title: { control: 'text' },
    level: {
      if: { arg: "title", truthy: true },
      control: {
        type: 'range',
        min: 1,
        max: 6,
      },
      min: 1,
      max: 6,
    },
    children: {
      control: 'text',
    },
  },
  render: (args) => {
    return (
      <div className="bg-primary:45 h-full w-full p-2xl">
        <Section {...args} />
      </div>
    );
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    level: 1,
    title: "Section Title",
    children: "Section Content",
  },
} as Story;
