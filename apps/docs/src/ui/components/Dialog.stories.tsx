import type { Meta, StoryObj } from "@storybook/react";

import { Dialog, IconEnum, Variant } from "@sceneforge/ui";

import { variantArgTypes } from "../../storiesHelpers";

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
  title: "@sceneforge|ui/Components/Dialog",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Dialog Content",
    title: "Dialog Title",
  },
} as Story;

export const WithActions: Story = {
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
