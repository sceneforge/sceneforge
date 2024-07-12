import type { Meta, StoryObj } from "@storybook/react";

import { Dropdown } from "@sceneforge/ui";

import { variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof Dropdown> = {
  argTypes: {
    children: {
      control: "text",
    },
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
    ...variantArgTypes("variant"),
    ...variantArgTypes("actionListVariant"),
  },
  component: Dropdown,
  decorators: [
    Story => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  title: "@sceneforge|ui/Components/Dropdown",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    actions: [
      { kind: "button", label: "Action 1" },
      { kind: "divider", label: "Short" },
      { kind: "button", label: "Action 2" },
      { kind: "button", label: "Action 3" },
      { kind: "divider", label: "Divider Label too big to be truth" },
      {
        actions: [
          { kind: "button", label: "Submenu Action 1" },
          { kind: "button", label: "Submenu Action 2" },
          { kind: "divider" },
          { kind: "button", label: "Submenu Action 3" },
        ], kind: "dropdown", label: "Submenu",
      },
    ],
    children: "Dropdown Text Content",
    scale: true,
  },
};
