import type { Meta, StoryObj } from "@storybook/react";

import TabPanel from "./TabPanel";

const meta: Meta<typeof TabPanel> = {
  argTypes: {
    tabId: {
      control: "text",
    },
  },
  component: TabPanel,
  title: "Component/Tabs/TabPanel",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    component: () => "TabPanel Content",
  },
} as Story;
