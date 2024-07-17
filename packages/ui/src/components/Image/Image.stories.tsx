import type { Meta, StoryObj } from "@storybook/react";

import { shapeArgTypes } from "../../storiesHelpers";
import Image from "./Image";

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
  title: "Component/Image",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    alt: "A random image from Picsum.photos",
    src: "https://picsum.photos/seed/123054/400/280",
  },
};
