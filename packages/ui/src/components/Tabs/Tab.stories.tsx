import type { Meta, StoryObj } from "@storybook/react";

import {
  orientationArgTypes,
  positionArgTypes,
} from "../../storiesHelpers";
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
    variant: {
      table: {
        disable: true,
      },
    },
    ...positionArgTypes("position"),
    ...orientationArgTypes("orientation"),
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
