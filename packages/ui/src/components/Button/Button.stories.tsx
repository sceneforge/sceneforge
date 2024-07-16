import type { Meta, StoryObj } from "@storybook/react";

import { shapeArgTypes, variantArgTypes } from "../../storiesHelpers";
import Button from "./Button";

const meta: Meta<typeof Button> = {
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
  component: Button,
  title: "Component/Button",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Button Text Content",
  },
};
