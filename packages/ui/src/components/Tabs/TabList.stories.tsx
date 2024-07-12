import type { Meta, StoryObj } from "@storybook/react";

import { alignArgTypes as alignArgumentTypes, orientationArgTypes as orientationArgumentTypes, positionArgTypes as positionArgumentTypes, variantArgTypes } from "../../storiesHelpers";
import { IconEnum } from "../../types";
import TabList from "./TabList";

const meta: Meta<typeof TabList> = {
  argTypes: {
    id: {
      control: "text",
    },
    label: {
      control: "text",
    },
    ...orientationArgumentTypes("orientation"),
    ...positionArgumentTypes("position"),
    ...alignArgumentTypes("align"),
    ...variantArgTypes("variant"),
  },
  component: TabList,
  title: "Component/Tabs/TabList",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    activeTabId: "tab-1",
    label: "TabList Label",
    tabs: [
      { icon: IconEnum.DeployedCode, id: "tab-1", label: "Tab 1" },
      { icon: IconEnum.Settings, id: "tab-2", label: "Tab 2" },
      { icon: IconEnum.Lightbulb, id: "tab-3", label: "Tab 3" },
    ],
  },
} as Story;
