import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';
import { icons } from '../tokens.stylex';
import { variantArgTypes } from '../../storiesHelpers';

const meta: Meta<typeof IconButton> = {
  title: 'Component/IconButton',
  component: IconButton,
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
    inverted: {
      control: 'boolean',
    },
    ref: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    size: 4,
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
    icon: "add",
    inverted: false,
    size: 4,
  },
} as Story;
