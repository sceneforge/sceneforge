import type { Meta, StoryObj } from '@storybook/react';
import TabPanel from './TabPanel';

const meta: Meta<typeof TabPanel> = {
  title: 'Component/Tabs/TabPanel',
  component: TabPanel,
  argTypes: {
    tabId: {
      control: 'text'
    },
  }
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    component: () => "TabPanel Content",
  },
} as Story;
