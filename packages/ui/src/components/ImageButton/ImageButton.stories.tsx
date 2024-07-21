import type { Meta, StoryObj } from "@storybook/react";

import { shapeArgTypes } from "../../storiesHelpers";
import ImageButton from "./ImageButton";

const meta: Meta<typeof ImageButton> = {
  argTypes: {
    alt: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    margin: {
      control: "number",
    },
    scale: {
      control: "boolean",
    },
    src: {
      control: "text",
    },
    title: {
      control: "text",
    },
    ...shapeArgTypes("shape"),
  },
  component: ImageButton,
  title: "Component/ImageButton",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    alt: "A random image from Picsum.photos",
    src: "https://picsum.photos/seed/49359032/400/280",
  },
};
