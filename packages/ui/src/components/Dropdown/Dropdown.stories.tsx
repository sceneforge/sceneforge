import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';
import { variantArgTypes } from '../../storiesHelpers';

const meta: Meta<typeof Dropdown> = {
  title: 'Component/Dropdown',
  component: Dropdown,
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
    children: "Dropdown Text Content",
    actions: [
      { type: "button", label: "Action 1" },
      { type: "button", label: "Action 2" },
      { type: "button", label: "Action 3" },
      {
        type: "dropdown", label: "Submenu", actions: [
          { type: "button", label: "Submenu Action 1" },
          { type: "button", label: "Submenu Action 2" },
          { type: "button", label: "Submenu Action 3" },
        ]
      }
    ]
  },
} as Story;
