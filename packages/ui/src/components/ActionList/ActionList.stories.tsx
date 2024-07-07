import type { Meta, StoryObj } from "@storybook/react";

import { orientationArgTypes, variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import ActionList from "./ActionList";

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
    ref: {
      table: {
        disable: true,
      },
    },
    style: {
      table: {
        disable: true,
      },
    },
    ...orientationArgTypes("orientation"),
    ...variantArgumentTypes("variant"),
  },
  component: ActionList,
  title: "Component/ActionList",
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
} as Story;
