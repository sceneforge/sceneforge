import type { Meta, StoryObj } from "@storybook/react";

import { alignArgTypes as alignArgumentTypes, orientationArgTypes as orientationArgumentTypes, positionArgTypes as positionArgumentTypes, variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { IconEnum } from "../../types";
import Tabs from "./Tabs";

const meta: Meta<typeof Tabs> = {
  argTypes: {
    ...variantArgumentTypes("variant"),
    ...orientationArgumentTypes("orientation"),
    ...positionArgumentTypes("position"),
    ...alignArgumentTypes("align"),
  },
  component: Tabs,
  title: "Component/Tabs",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    activeTabId: "tab-1",
    closeable: true,
    content: [
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

    label: "Tabs Label",
  },
} as Story;
