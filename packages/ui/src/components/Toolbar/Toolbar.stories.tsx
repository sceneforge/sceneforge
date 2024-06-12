import type { Meta, StoryObj } from '@storybook/react';
import Toolbar from './Toolbar';
import { Variant } from '../../types';

const meta: Meta<typeof Toolbar> = {
  title: 'Component/Toolbar',
  component: Toolbar,
  argTypes: {

  }
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    actions: [
      {
        type: "button",
        variant: Variant.Default,
        label: "Button 1",
      },
      {
        type: "button",
        variant: Variant.Accent,
        label: "Button 2",
      }
    ]
  },
} as Story;
