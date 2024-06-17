import type { Meta, StoryObj } from '@storybook/react';
import Topbar from './Topbar';
import { IconEnum } from '../../types';
import { variantArgTypes } from '../../storiesHelpers';

const meta: Meta<typeof Topbar> = {
  title: 'Component/Topbar',
  component: Topbar,
  argTypes: {
    title: {
      control: "text",
    },
    ...variantArgTypes("variant"),
  }
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    title: "Topbar Title",
  },
} as Story;

export const WithToolbar: Story = {
  args: {
    title: "Topbar Title With Toolbar",
    toolbarStart: {
      actions: [
        {
          type: "button",
          label: "Button 1",
        },
        {
          type: "button",
          label: "Button 2",
        }
      ]
    },
    toolbarEnd: {
      actions: [
        {
          type: "icon",
          icon: IconEnum.Globe,
          label: "Button 3",
        },
        {
          type: "button",
          label: "Button 4",
        }
      ]
    }
  }
}