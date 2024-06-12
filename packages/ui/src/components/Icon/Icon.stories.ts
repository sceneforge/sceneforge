import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';
import { icons } from '../tokens.stylex';
import { variantArgTypes } from '../storiesHelpers';

const meta: Meta<typeof Icon> = {
  title: 'Component/Icon',
  component: Icon,
  argTypes: {
    icon: {
      control: {
        type: 'select',
      },
      options: Object.keys(icons),
    },
    size: {
      control: {
        type: 'range',
        min: 1,
        max: 100,
      },
      table: {
        defaultValue: {
          summary: "4",
        },
      },
      min: 1,
      max: 100,
    },
    ...variantArgTypes('variant'),
    ref: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    size: 4,
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    icon: "add"
  },
} as Story;
