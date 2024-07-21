import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes } from "../../storiesHelpers";
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
    ...variantArgTypes("variant"),
  },
  component: Dialog,
  title: "Component/Dialog",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Dialog Content",
    open: true,
    title: "Dialog Title",
  },
};

export const WithActions: Story = {
  args: {
    actions: [
      {
        kind: "button",
        label: "Button 1",
        variant: Variant.Primary,
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
    open: true,
    title: "Dialog Title",
  },
};
