import type { Meta, StoryObj } from "@storybook/react";

import Image from "@sceneforge/ui";

import { shapeArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof Image> = {
  argTypes: {
    alt: {
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
    ...shapeArgTypes("shape"),
  },
  component: Image,
  title: "@sceneforge|ui/Components/Image",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    alt: "A random image from Picsum.photos",
    src: "https://picsum.photos/seed/123054/400/280",
  },
};
