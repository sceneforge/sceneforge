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
    ...variantArgumentTypes("variant"),
  },
  component: CommandBar,
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
    latestCommands: [
      {
        kind: "button",
        label: "Latest Command 1",
      },
      {
        kind: "button",
        label: "Latest Command 2",
      },
      {
        kind: "button",
        label: "Latest Command 3",
      },
      {
        kind: "button",
        label: "Latest Command 4",
      },
    ],
    suggestedCommands: [
      {
        kind: "button",
        label: "Suggested Command 1",
      },
      {
        kind: "button",
        label: "Suggested Command 2",
      },
      {
        kind: "button",
        label: "Suggested Command 3",
      },
      {
        kind: "button",
        label: "Suggested Command 4",
      },
    ],
  },
} as Story;
