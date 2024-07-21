import type { Meta, StoryObj } from "@storybook/react";

import { shapeArgTypes } from "../../storiesHelpers";
import { Shape, Variant } from "../../types";
import FigureGallery from "./FigureGallery";

const meta: Meta<typeof FigureGallery> = {
  argTypes: {
    figures: {
      control: {
        type: "object",
      },
    },
    id: {
      control: {
        type: "text",
      },
    },
    level: {
      control: {
        max: 6,
        min: 1,
        type: "range",
      },
      if: { arg: "title", truthy: true },
      max: 6,
      min: 1,
    },
    scale: {
      control: {
        type: "boolean",
      },
    },
    title: {
      control: {
        type: "text",
      },
    },
    ...shapeArgTypes("shape"),
  },
  component: FigureGallery,
  title: "Component/FigureGallery",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    figures: [
      {
        alt: "A random image from Picsum.photos 1",
        caption: "The Figure Button Dialog caption 1",
        src: "https://picsum.photos/seed/5938512/400/280",
        title: "The Figure Button Dialog title 1",
        variant: Variant.Accent,
      },
      {
        alt: "A random image from Picsum.photos 2",
        caption: "The Figure Button Dialog caption 2",
        src: "https://picsum.photos/seed/94030958/400/280",
        title: "The Figure Button Dialog title 2",
        variant: Variant.Accent,
      },
      {
        alt: "A random image from Picsum.photos 3",
        caption: "The Figure Button Dialog caption 3",
        src: "https://picsum.photos/seed/41238405/400/280",
        title: "The Figure Button Dialog title 3",
        variant: Variant.Accent,
      },
      {
        alt: "A random image from Picsum.photos 4",
        caption: "The Figure Button Dialog caption 4",
        src: "https://picsum.photos/seed/3995301/400/280",
        title: "The Figure Button Dialog title 4",
        variant: Variant.Accent,
      },
      {
        alt: "A random image from Picsum.photos 2",
        caption: "The Figure Button Dialog caption 2",
        src: "https://picsum.photos/seed/19586834/400/280",
        title: "The Figure Button Dialog title 2",
        variant: Variant.Accent,
      },
      {
        alt: "A random image from Picsum.photos 3",
        caption: "The Figure Button Dialog caption 3",
        src: "https://picsum.photos/seed/594385923/400/280",
        title: "The Figure Button Dialog title 3",
        variant: Variant.Accent,
      },
    ],
    level: 2,
    shape: Shape.Rectangle,
    title: "The Figure Gallery title",
  },
};
