import type { Meta, StoryObj } from "@storybook/react";

import { CarouselItem } from "@sceneforge/ui";

import { iconArgTypes, variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof CarouselItem> = {
  argTypes: {
    description: {
      control: "text",
      if: { arg: "kind", neq: "icon" },
      table: {
        category: "Cards",
      },
    },
    img: {
      control: "text",
      if: { arg: "kind", neq: "icon" },
      table: {
        category: "Cards",
      },
    },
    kind: {
      control: {
        options: ["button", "card", "icon"],
        type: "inline-radio",
      },
      options: ["button", "card", "icon"],
    },
    label: {
      control: "text",
    },
    ...variantArgTypes("variant"),
    dense: {
      control: "boolean",
      if: { arg: "kind", eq: "icon" },
      table: {
        category: "Icon",
      },
    },
    glossy: {
      control: "boolean",
      if: { arg: "kind", eq: "icon" },
      table: {
        category: "Icon",
      },
    },
    icon: {
      ...iconArgTypes("icon")["icon"],
      if: { arg: "kind", eq: "icon" },
      table: {
        category: "Icon",
      },
    },
    size: {
      control: {
        max: 100,
        min: 1,
        type: "range",
      },
      if: { arg: "kind", eq: "icon" },
      table: {
        category: "Icon",
      },
    },
  },
  component: CarouselItem,
  title: "@sceneforge|ui/Components/CarouselItem",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    img: "https://picsum.photos/seed/green/200",
    kind: "button",
    label: "Carousel Item Label",
  },
} as Story;
