import type { Meta, StoryObj } from "@storybook/react";

import { Drawer, Variant } from "@sceneforge/ui";

import { orientationArgTypes, positionArgTypes, variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof Drawer> = {
  argTypes: {
    children: {
      control: "text",
    },
    label: {
      control: "text",
    },
    resizable: {
      control: "boolean",
    },
    size: {
      control: {
        max: 100,
        min: 1,
        type: "range",
      },
      max: 100,
      min: 1,
    },
    ...variantArgTypes("variant"),
    ...orientationArgTypes("orientation"),
    ...positionArgTypes("position"),
  },
  component: Drawer,
  decorators: [
    Story => (
      <div
        style={{
          aspectRatio: "1.85",
          display: "block",
          minWidth: "18rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
  title: "@sceneforge|ui/Components/Drawer",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          padding: "1rem 2rem",
        }}
      >
        Drawer Content
      </div>
    ),
    label: "Drawer Title",
    resizable: true,
    size: 48,
    variant: Variant.Primary,
  },
};
