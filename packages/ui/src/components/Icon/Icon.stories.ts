import type { Meta, StoryObj } from "@storybook/react";

import { iconArgTypes, variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { IconEnum } from "../../types";
import Icon from "./Icon";

const meta: Meta<typeof Icon> = {
  argTypes: {
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
    ...iconArgTypes("icon"),
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
    icon: IconEnum.Add,
  },
} as Story;
