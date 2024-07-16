import type { Meta, StoryObj } from "@storybook/react";

import { orientationArgTypes, positionArgTypes, variantArgTypes } from "../../storiesHelpers";
import { Variant } from "../../types";
import Drawer from "./Drawer";

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
    ...orientationArgTypes("orientation"),
    ...positionArgTypes("position"),
    ...variantArgTypes("variant"),
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
  title: "Component/Drawer",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          paddingBlock: "1rem",
          paddingInline: "2rem",
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
