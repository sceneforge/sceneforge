import type { Meta, StoryObj } from "@storybook/react";

import { Carousel, IconEnum, Variant } from "@sceneforge/ui";

import { variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof Carousel> = {
  argTypes: {
    items: {
      table: {
        type: {
          summary: "CarouselItemProps[]",
        },
      },
    },
    level: {
      control: {
        max: 6,
        min: 1,
        type: "range",
      },
      range: {
        max: 6,
        min: 1,
      },
      table: {
        type: {
          summary: "1 | 2 | 3 | 4 | 5 | 6",
        },
      },
    },
    title: {
      control: "text",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    ...variantArgTypes("itemsVariant"),
    ...variantArgTypes("variant"),
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
  title: "@sceneforge|ui/Components/Carousel",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    items: [
      { img: "https://picsum.photos/seed/201/500", kind: "button", label: "Content 1 with a very long heading title that should break the thing" },
      { img: "https://picsum.photos/seed/202/500", kind: "button", label: "Content 2" },
      { img: "https://picsum.photos/seed/203/500", kind: "button", label: "Content 3" },
      { img: "https://picsum.photos/seed/204/500", kind: "button", label: "Content 4" },
      { img: "https://picsum.photos/seed/205/500", kind: "button", label: "Content 5" },
      { img: "https://picsum.photos/seed/206/500", kind: "button", label: "Content 6" },
      { img: "https://picsum.photos/seed/204/500", kind: "button", label: "Content 7" },
      { img: "https://picsum.photos/seed/205/500", kind: "button", label: "Content 8" },
      {
        glossy: true,
        icon: IconEnum.Add,
        inverted: true,
        kind: "icon",
        label: "Add",
        size: 20,
      },
    ],
    itemsVariant: Variant.Accent,
    title: "Carousel Title",
  },
};
