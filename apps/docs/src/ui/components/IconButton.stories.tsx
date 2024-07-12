import type { Meta, StoryObj } from "@storybook/react";

import { IconButton, IconEnum } from "@sceneforge/ui";

import { iconArgTypes, variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof IconButton> = {
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
    ...variantArgTypes("variant"),
    ...iconArgTypes("icon"),
    inverted: {
      control: "boolean",
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
