import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { IconEnum, Variant } from "../../types";
import Dialog from "./Dialog";

const meta: Meta<typeof Dialog> = {
  argTypes: {
    children: {
      control: "text",
    },
    description: {
      control: "text",
    },
    title: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: Dialog,
  title: "Component/Dialog",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Dialog Content",
    title: "Dialog Title",
  },
} as Story;

export const WithToolbar: Story = {
  args: {
    actions: [
      {
        kind: "button",
        label: "Button 1",
        variant: Variant.Default,
      },
      {
        icon: IconEnum.Delete,
        inverted: true,
        kind: "icon",
        label: "Delete",
        variant: Variant.Danger,
      },
    ],
    children: "Dialog Content",
    title: "Dialog Title",
  },
};
