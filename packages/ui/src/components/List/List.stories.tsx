import type { Meta, StoryObj } from "@storybook/react";

import List from "./List";
import ListItem from "./ListItem";

const meta: Meta<typeof List> = {
  argTypes: {
    gap: {
      control: "number",
    },
  },
  component: List,
  title: "Component/List",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: (
      <>
        <ListItem key="List-1">List Item 1</ListItem>
        <ListItem key="List-2">List Item 2</ListItem>
        <ListItem key="List-3">List Item 3</ListItem>
      </>
    ),
  },
};
