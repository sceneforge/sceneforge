import type { Meta, StoryObj } from '@storybook/react';
import Tab from './Tab';
import { orientationArgTypes, positionArgTypes } from '../storiesHelpers';

const meta: Meta<typeof Tab> = {
  title: 'Component/Tabs/Tab',
  component: Tab,
  argTypes: {
    label: {
      control: 'text',
    },
    active: {
      control: 'boolean'
    },
    id: {
      control: 'text'
    },
    ...positionArgTypes('position'),
    ...orientationArgTypes('orientation'),
  }
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    id: "tab-1",
    label: "Tab Label",
  },
} as Story;
