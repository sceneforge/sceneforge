import type { Meta, StoryObj } from '@storybook/react';
import Dialog from './Dialog';
import { IconEnum, Variant } from '../../types';
import { variantArgTypes } from '../../storiesHelpers';

const meta: Meta<typeof Dialog> = {
  title: 'Component/Dialog',
  component: Dialog,
  argTypes: {
    description: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
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
    title: "Dialog Title",
    children: "Dialog Content",
  },
} as Story;

export const WithToolbar: Story = {
  args: {
    title: "Dialog Title",
    children: "Dialog Content",
    toolbar: {
      actions: [
        {
          type: "button",
          variant: Variant.Default,
          label: "Button 1",
        },
        {
          type: "icon",
          variant: Variant.Danger,
          icon: IconEnum.Delete,
          label: "Delete",
        }
      ]
    }
  }
}