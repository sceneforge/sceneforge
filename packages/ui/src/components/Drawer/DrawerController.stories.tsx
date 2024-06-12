import type { Meta, StoryObj } from '@storybook/react';
import DrawerController from './DrawerController';
import { Orientation, Position, Variant } from '../../types';
import { orientationArgTypes, positionArgTypes, variantArgTypes } from '../storiesHelpers';

const meta: Meta<typeof DrawerController> = {
  title: 'Component/DrawerController',
  component: DrawerController,
  render: (args) => (
    <div className="w-100 h-100 outline">
      <DrawerController {...args} />
    </div>
  ),
  argTypes: {
    label: {
      control: 'text',
    },
    children: {
      control: 'text',
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
    label: "DrawerController Title",
    children: (<div className="p-block-2 p-inline-4">DrawerController Content</div>),
    orientation: Orientation.Vertical,
    position: Position.End,
    initialSize: 48,
    variant: Variant.Accent,
    resizable: true,
  },
} as Story;
