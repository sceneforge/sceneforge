import type { Meta, StoryObj } from "@storybook/react";

import { ActionList } from "@sceneforge/ui";

import { orientationArgTypes, variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof ActionList> = {
  argTypes: {
    actions: {
      control: {
        type: "object",
      },
    },
    actionsDense: {
      control: "boolean",
    },
    actionsScale: {
      control: "boolean",
    },
    actionsStyle: {
      table: {
        disable: true,
      },
    },
    gap: {
      control: "number",
    },
    hidden: {
      control: "boolean",
    },
    margin: {
      control: "number",
    },
    padding: {
      control: "number",
    },
    ...orientationArgTypes("orientation"),
    ...variantArgTypes("variant"),
  },
  component: ActionList,
  title: "@sceneforge|ui/Components/ActionList",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    actions: [
      {
        kind: "button",
        label: "Action 1",
      },
      {
        kind: "button",
        label: "Action 2",
      },
      {
        kind: "divider",
      },
      {
        kind: "button",
        label: "Action 3",
      },
    ],
  },
};
