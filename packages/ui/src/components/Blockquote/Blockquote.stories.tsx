import type { Meta, StoryObj } from '@storybook/react';
import Blockquote from './Blockquote';
import { variantArgTypes } from '../../storiesHelpers';

const meta: Meta<typeof Blockquote> = {
  title: 'Component/Blockquote',
  component: Blockquote,
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
    title: "Blockquote Title",
    children: "Blockquote Content",
  },
} as Story;
