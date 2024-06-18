import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Dropdown from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  argTypes: {
    children: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: Dropdown,
  decorators: [
    Story => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  title: "Component/Dropdown",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    actions: [
      { label: "Action 1", type: "button" },
      { label: "Action 2", type: "button" },
      { label: "Action 3", type: "button" },
      {
        actions: [
          { label: "Submenu Action 1", type: "button" },
          { label: "Submenu Action 2", type: "button" },
          { label: "Submenu Action 3", type: "button" },
        ], label: "Submenu", type: "dropdown",
      },
    ],
    children: "Dropdown Text Content",
  },
} as Story;
