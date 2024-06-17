import type { Meta, StoryObj } from '@storybook/react';
import View from './View';
import { variantArgTypes } from '../../storiesHelpers';

const meta: Meta<typeof View> = {
  title: 'Component/View',
  component: View,
  argTypes: {
    children: {
      control: 'text',
    },
    ...variantArgTypes('variant'),
  }
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "View Text Content",
  },
} as Story;
