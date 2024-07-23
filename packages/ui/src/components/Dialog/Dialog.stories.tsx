import type { Meta, StoryObj } from "@storybook/react";

import { createRef } from "react";

import { variantArgTypes } from "../../storiesHelpers";
import { IconEnum, Variant } from "../../types";
import Button from "../Button/Button";
import Dialog from "./Dialog";

const dialogRef = createRef<HTMLDialogElement | null>();

const openDialog = () => {
  if (
    dialogRef.current
    && dialogRef.current instanceof HTMLDialogElement
  ) {
    dialogRef.current.showModal();
  }
};

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
  decorators: [
    Story => (
      <div
        style={{
          aspectRatio: "1.85",
          display: "block",
          isolation: "isolate",
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: function MyComponent(args) {
    return (
      <>
        <Button
          autoFocus
          onClick={openDialog}
          variant={Variant.Primary}
        >
          Open Dialog
        </Button>
        <Dialog
          {...args}
          ref={dialogRef}
        />
      </>
    );
  },
  title: "Component/Dialog",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Dialog Content",
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
    title: "Dialog Title",
  },
};
