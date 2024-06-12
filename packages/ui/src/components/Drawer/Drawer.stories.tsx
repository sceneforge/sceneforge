import type { Meta, StoryObj } from '@storybook/react';
import Drawer from './Drawer';
import { Variant } from '../../types';
import { orientationArgTypes, positionArgTypes, variantArgTypes } from '../storiesHelpers';

const meta: Meta<typeof Drawer> = {
  title: 'Component/Drawer',
  component: Drawer,
  render: (args) => (
    <div className="w-100 h-100 outline">
      <Drawer {...args} />
    </div>
  ),
  argTypes: {
    label: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
    size: {
      control: {
        type: "range",
        min: 1,
        max: 100,
      },
      min: 1,
      max: 100,
    },
    resizable: {
      control: 'boolean',
    },
    ...variantArgTypes('variant'),
    ...orientationArgTypes('orientation'),
    ...positionArgTypes('position'),
  }
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    label: "Drawer Title",
    children: (<div style={{ paddingInline: "2rem", paddingBlock: "1rem" }}>Drawer Content</div>),
    size: 48,
    variant: Variant.Default,
    resizable: true,
  },
} as Story;
