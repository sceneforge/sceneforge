import type { Meta, StoryObj } from '@storybook/react';
import CardButton from './CardButton';
import { variantArgTypes } from '../../storiesHelpers';

const meta: Meta<typeof CardButton> = {
  title: 'Component/CardButton',
  component: CardButton,
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
      <CardButton {...args} />
    </div>
  ),
  args: {
    title: "Card Button Title",
    img: "https://picsum.photos/seed/green/200",
    children: (<div className="p-block-2 p-inline-4">Card Button Content</div>),
  },
} as Story;
