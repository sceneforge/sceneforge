import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Blockquote from "./Blockquote";

const meta: Meta<typeof Blockquote> = {
  argTypes: {
    children: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: Blockquote,
  title: "Component/Blockquote",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Blockquote Content",
    title: "Blockquote Title",
  },
} as Story;
