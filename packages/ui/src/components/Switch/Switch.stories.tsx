import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Switch from "./Switch";

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
    ref: {
      table: {
        disable: true,
      },
    },
    ...variantArgumentTypes("variant"),
  },
  component: Switch,
  title: "Component/Switch",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
