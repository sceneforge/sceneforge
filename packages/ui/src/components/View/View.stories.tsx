import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import View from "./View";

const meta: Meta<typeof View> = {
  argTypes: {
    children: {
      control: "text",
    },
    margin: {
      control: "number",
    },
    padding: {
      control: "number",
    },
    scrollable: {
      control: "inline-radio",
      options: [true, false, "inline", "block"],
    },
    ...variantArgumentTypes("variant"),
    ref: {
      table: {
        disable: true,
      },
    },
    style: {
      table: {
        disable: true,
      },
    },
  },
  component: View,
  title: "Component/View",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "View Text Content",
  },
} as Story;
