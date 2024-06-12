import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';
import { IconEnum } from '../../types';
import { alignArgTypes, orientationArgTypes, positionArgTypes, variantArgTypes } from '../storiesHelpers';

const meta: Meta<typeof Tabs> = {
  title: 'Component/Tabs',
  component: Tabs,
  argTypes: {
    ...variantArgTypes('variant'),
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
    closeable: true,
    label: "Tabs Label",

    content: [
      {
        tab: {
          id: "tab-1",
          label: "Tab 1",
          icon: IconEnum.DeployedCode,
        },
        panel: {
          component: () => "TabPanel 1 Content",
        },
      },
      {
        tab: {
          id: "tab-2",
          label: "Tab 2",
          icon: IconEnum.Settings,
        },
        panel: {
          component: () => "TabPanel 2 Content",
        }
      },
      {
        tab: {
          id: "tab-3",
          label: "Tab 3",
          icon: IconEnum.Lightbulb,
        },
        panel: {
          component: () => "TabPanel 3 Content",
        }
      }
    ]
  },
} as Story;
