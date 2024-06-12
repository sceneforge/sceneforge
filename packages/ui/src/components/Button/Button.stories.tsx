import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { variantArgTypes } from '../storiesHelpers';

const meta: Meta<typeof Button> = {
  title: 'Component/Button',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
    },
    ...variantArgTypes('variant'),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    )
  ]
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Button Text Content",
  },
} as Story;
