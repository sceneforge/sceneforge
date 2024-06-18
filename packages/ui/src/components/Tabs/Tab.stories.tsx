import type { Meta, StoryObj } from "@storybook/react";

import { orientationArgTypes as orientationArgumentTypes, positionArgTypes as positionArgumentTypes } from "../../storiesHelpers";
import Tab from "./Tab";

const meta: Meta<typeof Tab> = {
  argTypes: {
    active: {
      control: "boolean",
    },
    id: {
      control: "text",
    },
    label: {
      control: "text",
    },
    ...positionArgumentTypes("position"),
    ...orientationArgumentTypes("orientation"),
  },
  component: Tab,
  title: "Component/Tabs/Tab",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    id: "tab-1",
    label: "Tab Label",
  },
} as Story;
