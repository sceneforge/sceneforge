import type { Meta, StoryObj } from '@storybook/react';
import TabList from './TabList';
import { IconEnum } from '../../types';
import { alignArgTypes, orientationArgTypes, positionArgTypes } from '../storiesHelpers';

const meta: Meta<typeof TabList> = {
  title: 'Component/Tabs/TabList',
  component: TabList,
  argTypes: {
    label: {
      control: 'text',
    },
    id: {
      control: 'text'
    },
    ...orientationArgTypes('orientation'),
    ...positionArgTypes('position'),
    ...alignArgTypes('align'),
  }
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    activeTabId: "tab-1",
    label: "TabList Label",
    tabs: [
      { id: "tab-1", label: "Tab 1", icon: IconEnum.DeployedCode },
      { id: "tab-2", label: "Tab 2", icon: IconEnum.Settings },
      { id: "tab-3", label: "Tab 3", icon: IconEnum.Lightbulb },
    ],
  },
} as Story;
