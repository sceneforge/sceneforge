import type { Meta, StoryObj } from "@storybook/react";

import { createRef } from "react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { Variant } from "../../types";
import Button from "../Button/Button";
import CommandBar from "./CommandBar";

const commandBarRef = createRef<HTMLDialogElement | null>();

const openCommandBar = () => {
  if (
    commandBarRef.current
    && commandBarRef.current instanceof HTMLDialogElement
  ) {
    commandBarRef.current.showModal();
  }
};

const meta: Meta<typeof CommandBar> = {
  argTypes: {
    label: {
      control: "text",
    },
    open: {
      control: "boolean",
    },
    ...variantArgumentTypes("variant"),
  },
  component: CommandBar,
  decorators: [
    Story => (
      <div
        style={{
          alignContent: "center",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "screen",
          backgroundColor: "color-mix(in srgb, Canvas 10%, transparent)",
          backgroundImage: "conic-gradient(from 0deg, #ffadad, #ffd6a5, #fdffb6, #caffbf, #9bf6ff, #a0c4ff, #bdb2ff, #ffc6ff, #ffadad)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          inset: 0,
          overflow: "hidden",
          position: "absolute",
          textAlign: "center",
        }}
      >
        <Story />
      </div>
    ),
    Story => (
      <div
        style={{
          aspectRatio: "1.85",
          display: "block",
          minWidth: "100dvw",
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
          onClick={openCommandBar}
          variant={Variant.Accent}
        >
          Open Command Bar
        </Button>

        <CommandBar
          {...args}
          ref={commandBarRef}
        />
      </>
    );
  },
  title: "Component/CommandBar",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    label: "CommandBar Title",
  },
} as Story;
