import type { Meta, StoryObj } from '@storybook/react';
import TabsController from './TabsController';
import { IconEnum } from '../../types';
import { alignArgTypes, orientationArgTypes, positionArgTypes, variantArgTypes } from '../storiesHelpers';

const meta: Meta<typeof TabsController> = {
  title: 'Component/TabsController',
  component: TabsController,
  argTypes: {
    closeable: {
      control: 'boolean',
    },
    ...variantArgTypes('variant'),
    ...positionArgTypes('position'),
    ...orientationArgTypes('orientation'),
    ...alignArgTypes('align'),
  }
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    activeTabId: "tab-1",
    closeable: true,
    label: "TabsController Label",
    initialContent: [
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
