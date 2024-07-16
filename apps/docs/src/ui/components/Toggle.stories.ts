import type { Meta, StoryObj } from "@storybook/react";

import { Toggle, Variant } from "@sceneforge/ui";

import { shapeArgTypes, variantArgTypes } from "../../storiesHelpers";

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
    ...shapeArgTypes("shape"),
    ...variantArgTypes("variant"),
  },
  component: Toggle,
  title: "@sceneforge|ui/Components/Toggle",
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
      Variant.Primary,
      Variant.Accent,
    ],
  },
};
