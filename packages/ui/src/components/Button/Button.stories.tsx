import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  argTypes: {
    children: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: Button,
  decorators: [
    Story => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  title: "Component/Button",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Button Text Content",
  },
} as Story;
