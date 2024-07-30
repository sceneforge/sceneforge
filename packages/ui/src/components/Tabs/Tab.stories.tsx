import type { Meta, StoryObj } from "@storybook/react";

import {
  iconArgTypes,
  orientationArgTypes,
  positionArgTypes,
  variantArgTypes,
} from "../../storiesHelpers";
import { IconEnum } from "../../types";
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
    ...iconArgTypes("icon"),
    ...variantArgTypes("variant"),
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
};

export const TabWithIcon: Story = {
  args: {
    icon: IconEnum.Globe,
    id: "tab-2",
    label: "Icon Tab Label",
  },
};
