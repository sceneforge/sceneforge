import type { Meta, StoryObj } from "@storybook/react";

import { Variant } from "../../types";
import Toolbar from "./Toolbar";

const meta: Meta<typeof Toolbar> = {
  argTypes: {},
  component: Toolbar,
  title: "Component/Toolbar",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    actions: [
      {
        label: "Button 1",
        type: "button",
        variant: Variant.Default,
      },
      {
        label: "Button 2",
        type: "button",
        variant: Variant.Accent,
      },
    ],
  },
} as Story;
