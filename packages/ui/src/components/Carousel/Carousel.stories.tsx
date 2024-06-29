import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { IconEnum, Variant } from "../../types";
import CardButton from "../CardButton/CardButton";
import IconButton from "../IconButton/IconButton";
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
  decorators: [
    Story => (
      <div
        style={{
          aspectRatio: "1.85",
          display: "block",
          isolation: "isolate",
          minWidth: "18rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
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

export const WithIconButton: Story = {
  args: {
    items: [
      <IconButton
        icon={IconEnum.Add}
        key="carousel-7"
        label="Add"
        size={20}
        variant={Variant.Accent}
      />,
    ],
    title: "Carousel Title",
  },
} as Story;
