import type { Meta, StoryObj } from "@storybook/react";

import { alignArgTypes as alignArgumentTypes, orientationArgTypes as orientationArgumentTypes, positionArgTypes as positionArgumentTypes, variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { IconEnum } from "../../types";
import TabsController from "./TabsController";

const meta: Meta<typeof TabsController> = {
  argTypes: {
    closeable: {
      control: "boolean",
    },
    ...variantArgumentTypes("variant"),
    ...positionArgumentTypes("position"),
    ...orientationArgumentTypes("orientation"),
    ...alignArgumentTypes("align"),
  },
  component: TabsController,
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
          label: "Tab 1",
        },
      },
      {
        panel: {
          component: () => "TabPanel 2 Content",
        },
        tab: {
          icon: IconEnum.Settings,
          id: "tab-2",
          label: "Tab 2",
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
    ],
    label: "TabsController Label",
  },
} as Story;
