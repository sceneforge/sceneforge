import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "@sceneforge/ui";

import { variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof Switch> = {
  argTypes: {
    checked: {
      control: "boolean",
    },
    defaultChecked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    readOnly: {
      control: "boolean",
    },
    ...variantArgTypes("variant"),
  },
  component: Switch,
  title: "@sceneforge|ui/Components/Switch",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
