import type { Meta, StoryObj } from "@storybook/react";

import { iconArgTypes, variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { IconEnum } from "../../types";
import IconButton from "./IconButton";

const meta: Meta<typeof IconButton> = {
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
    inverted: {
      control: "boolean",
    },
    ref: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    size: 4,
  },
  component: IconButton,
  decorators: [
    Story => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  title: "Component/IconButton",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    icon: IconEnum.Add,
    inverted: false,
    size: 4,
  },
} as Story;
