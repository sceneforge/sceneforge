import type { Meta, StoryObj } from "@storybook/react";

import { Action } from "@sceneforge/ui";

import { iconArgTypes, shapeArgTypes, variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof Action> = {
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    dense: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    inverted: {
      control: "boolean",
    },
    kind: {
      control: {
        type: "select",
      },
      options: ["button", "divider", "dropdown", "icon", "toggle"],
    },
    margin: {
      control: "number",
    },
    padding: {
      control: "number",
    },
    scale: {
      control: "boolean",
    },
    size: {
      control: {
        type: "number",
      },
    },
    ...shapeArgTypes("shape"),
    ...iconArgTypes("icon"),
    ...variantArgTypes("variant"),
  },
  component: Action,
  title: "@sceneforge|ui/Components/Action",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    kind: "button",
    label: "Action Text Content",
  },
} as Story;
