import type { Meta, StoryObj } from "@storybook/react";

import {
  alignArgTypes,
  orientationArgTypes,
  positionArgTypes,
  variantArgTypes,
} from "../../storiesHelpers";
import { IconEnum } from "../../types";
import TabsController from "./TabsController";

const meta: Meta<typeof TabsController> = {
  argTypes: {
    closeable: {
      control: "boolean",
    },
    onTabClose: {
      table: {
        disable: true,
      },
    },
    ...variantArgTypes("variant"),
    ...positionArgTypes("position"),
    ...orientationArgTypes("orientation"),
    ...alignArgTypes("align"),
  },
  component: TabsController,
  decorators: [
    Story => (
      <div style={{ height: "200px", width: "400px" }}>
        <Story />
      </div>
    ),
  ],
  title: "Component/TabsController",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    activeTabId: "tab-1",
    closeable: true,
    initialContent: [
      {
        panel: {
          component: () => "TabPanel 1 Content",
        },
        tab: {
          icon: IconEnum.DeployedCode,
          id: "tab-1",
          label: "Tab Label Long 1",
        },
      },
      {
        panel: {
          component: () => "TabPanel 2 Content",
        },
        tab: {
          icon: IconEnum.Settings,
          id: "tab-2",
          label: "Tab Medium 2",
        },
      },
      {
        panel: {
          component: () => "TabPanel 3 Content",
        },
        tab: {
          icon: IconEnum.Lightbulb,
          id: "tab-3",
          label: "Tab 3",
        },
      },
      {
        panel: {
          component: () => "TabPanel 4 Content",
        },
        tab: {
          icon: IconEnum.Globe,
          id: "tab-4",
          label: "Tab 4",
        },
      },
      {
        panel: {
          component: () => "TabPanel 5 Content",
        },
        tab: {
          icon: IconEnum.Camera,
          id: "tab-5",
          label: "Tab 5",
        },
      },
      {
        panel: {
          component: () => "TabPanel 6 Content",
        },
        tab: {
          icon: IconEnum.Transform,
          id: "tab-6",
          label: "Tab 6",
        },
      },
      {
        panel: {
          component: () => "TabPanel 7 Content",
        },
        tab: {
          icon: IconEnum.FileMap,
          id: "tab-7",
          label: "Tab 7",
        },
      },
    ],
    label: "TabsController Label",
  },
} as Story;
