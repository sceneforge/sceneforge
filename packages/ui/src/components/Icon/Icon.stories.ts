import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { icons } from "../tokens.stylex";
import Icon from "./Icon";

const meta: Meta<typeof Icon> = {
  argTypes: {
    icon: {
      control: {
        type: "select",
      },
      options: Object.keys(icons),
    },
    size: {
      control: {
        max: 100,
        min: 1,
        type: "range",
      },
      max: 100,
      min: 1,
      table: {
        defaultValue: {
          summary: "4",
        },
      },
    },
    ...variantArgumentTypes("variant"),
    ref: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    size: 4,
  },
  component: Icon,
  title: "Component/Icon",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    icon: "add",
  },
} as Story;
