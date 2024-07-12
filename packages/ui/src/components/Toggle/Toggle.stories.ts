import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { Variant } from "../../types";
import Toggle from "./Toggle";

const meta: Meta<typeof Toggle> = {
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
    ...variantArgumentTypes("variant"),
  },
  component: Toggle,
  title: "Component/Toggle",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    label: [
      "Toggle Off",
      "Toggle On",
    ],
    variant: [
      Variant.Default,
      Variant.Accent,
    ],
  },
} as Story;
