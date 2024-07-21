import type { Meta, StoryObj } from "@storybook/react";

import { shapeArgTypes, variantArgTypes } from "../../storiesHelpers";
import { Variant } from "../../types";
import FigureButtonDialog from "./FigureButtonDialog";

const meta: Meta<typeof FigureButtonDialog> = {
  argTypes: {
    alt: {
      control: {
        type: "text",
      },
    },
    caption: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    scale: {
      control: {
        type: "boolean",
      },
    },
    src: {
      control: {
        type: "text",
      },
    },
    title: {
      control: {
        type: "text",
      },
    },
    ...variantArgTypes("variant"),
    ...shapeArgTypes("shape"),
  },
  component: FigureButtonDialog,
  title: "Component/FigureButtonDialog",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    alt: "A random image from Picsum.photos",
    caption: "The Figure Button Dialog caption",
    src: "https://picsum.photos/seed/90716898/400/280",
    title: "The Figure Button Dialog title",
    variant: Variant.Accent,
  },
};
