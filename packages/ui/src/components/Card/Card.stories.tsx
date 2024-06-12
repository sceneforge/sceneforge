import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import { variantArgTypes } from '../storiesHelpers';

const meta: Meta<typeof Card> = {
  title: 'Component/Card',
  component: Card,
  argTypes: {
    title: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
    zoom: {
      if: { arg: "img", truthy: true },
      control: {
        type: 'range',
        min: 0,
        max: 4,
      },
      min: 0,
      max: 4,
    },
    img: {
      control: "text",
    },
    ...variantArgTypes('variant'),
  }
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  render: (args) => (
    <div className="w-100 p-10 hover:ring:10 rounded-2xl">
      <Card {...args} />
    </div>
  ),
  args: {
    title: "Card Title",
    children: (<div className="p-block-2 p-inline-4">Card Content</div>),
    img: "https://picsum.photos/seed/random/1200",
  },
} as Story;
