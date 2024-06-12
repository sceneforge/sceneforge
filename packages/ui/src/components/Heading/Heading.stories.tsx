import type { Meta, StoryObj } from '@storybook/react';
import Heading from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Component/Heading',
  component: Heading,
  argTypes: {
    level: {
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
  }
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    level: 1,
    children: "Heading Text Content",
  },
} as Story;
