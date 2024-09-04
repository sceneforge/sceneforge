import type { Meta, StoryObj } from "@storybook/react";

import { shapeArgTypes, variantArgTypes } from "../../storiesHelpers";
import List from "../List/List";
import ListCard from "./ListCard";

const meta: Meta<typeof ListCard> = {
  argTypes: {
    description: {
      control: "text",
    },
    imageAlt: {
      control: "text",
    },
    imageSrc: {
      control: "text",
    },
    imageTitle: {
      control: "text",
    },
    title: {
      control: "text",
    },
    ...shapeArgTypes("imageShape"),
    ...variantArgTypes("variant"),
  },
  component: ListCard,
  render: args => (
    <List>
      <ListCard {...args} />
    </List>
  ),
  title: "Component/ListCard",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    description: "This is the list card description",
    imageAlt: "Image Alt",
    imageSrc: "https://picsum.photos/seed/building/1200",
    imageTitle: "Image Title",
    title: "List Card Title",
  },
};
