import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Toggle from "./Toggle";

const meta: Meta<typeof Toggle> = {
  argTypes: {
    children: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: Toggle,
  title: "Component/Toggle",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Toggle Text Content",
  },
} as Story;
