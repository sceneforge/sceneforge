import type { Meta, StoryObj } from "@storybook/react";

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
    src: "https://picsum.photos/seed/90716898/500/500",
  },
};
