import type { Meta, StoryObj } from "@storybook/react";

import { iconArgTypes, shapeArgTypes, variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { IconEnum } from "../../types";
import IconButton from "./IconButton";

const meta: Meta<typeof IconButton> = {
  args: {
    size: 4,
  },
  argTypes: {
    dense: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    glossy: {
      control: "boolean",
    },
    inverted: {
      control: "boolean",
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
    ...iconArgTypes("icon"),
    ...shapeArgTypes("shape"),
    ...variantArgumentTypes("variant"),
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
