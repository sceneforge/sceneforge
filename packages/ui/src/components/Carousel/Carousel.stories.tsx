import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Carousel from "./Carousel";

const meta: Meta<typeof Carousel> = {
  argTypes: {
    items: {
      control: "text",
    },
    title: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: Carousel,
  title: "Component/Carousel",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    items: [
      <div key="carousel-1">Content 1</div>,
      <div key="carousel-2">Content 2</div>,
      <div key="carousel-3">Content 3</div>,
      <div key="carousel-4">Content 4</div>,
      <div key="carousel-4">Content 5</div>,
      <div key="carousel-4">Content 6</div>,
    ],
    title: "Carousel Title",
  },
} as Story;
