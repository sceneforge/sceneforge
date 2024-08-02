import type { Meta, StoryObj } from "@storybook/react";

import { IconButton, IconEnum } from "@sceneforge/ui";

import { iconArgTypes, shapeArgTypes, variantArgTypes } from "../../storiesHelpers";

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
    ...shapeArgTypes("shape"),
    ...variantArgTypes("variant"),
    ...iconArgTypes("icon"),
  },
  component: IconButton,
  decorators: [
    Story => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  title: "@sceneforge|ui/Components/IconButton",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    icon: IconEnum.Add,
    inverted: false,
    size: 4,
  },
};
