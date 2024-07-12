import type { Meta, StoryObj } from "@storybook/react";

import { Action } from "@sceneforge/ui";

import { iconArgTypes, variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";

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
    ...iconArgTypes("icon"),
    inverted: {
      control: "boolean",
    },
    size: {
      control: {
        type: "number",
      },
    },
    ...variantArgumentTypes("variant"),
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
