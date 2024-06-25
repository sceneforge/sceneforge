import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import CardButton from "../CardButton/CardButton";
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
      <CardButton img="https://picsum.photos/seed/201/500" key="carousel-1" title="Content 1" />,
      <CardButton img="https://picsum.photos/seed/202/500" key="carousel-2" title="Content 2" />,
      <CardButton img="https://picsum.photos/seed/203/500" key="carousel-3" title="Content 3" />,
      <CardButton img="https://picsum.photos/seed/204/500" key="carousel-4" title="Content 4" />,
      <CardButton img="https://picsum.photos/seed/205/500" key="carousel-5" title="Content 5" />,
      <CardButton img="https://picsum.photos/seed/206/500" key="carousel-6" title="Content 6" />,
    ],
    title: "Carousel Title",
  },
} as Story;
