import type { Meta, StoryObj } from '@storybook/react';
import Toggle from './Toggle';
import { variantArgTypes } from '../storiesHelpers';

const meta: Meta<typeof Toggle> = {
  title: 'Component/Toggle',
  component: Toggle,
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
    children: "Toggle Text Content",
  },
} as Story;
