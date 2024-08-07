import type { Meta, StoryObj } from "@storybook/react";

import { shapeArgTypes } from "../../storiesHelpers";
import Figure from "./Figure";

const meta: Meta<typeof Figure> = {
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
    frame: {
      control: {
        type: "boolean",
      },
    },
    inset: {
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
    ...shapeArgTypes("shape"),
  },
  component: Figure,
  title: "Component/Figure",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    alt: "A random image from Picsum.photos",
    caption: "The figure caption",
    src: "https://picsum.photos/seed/90716898/400/280",
  },
};
