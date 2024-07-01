import type { Meta, StoryObj } from "@storybook/react";

import { Variant } from "../../types";
import View from "../View/View";
import Pane from "./Pane";

const meta: Meta<typeof Pane> = {
  argTypes: {
    actions: {
      control: "object",
    },
    children: {
      control: "text",
    },
    level: {
      control: {
        max: 6,
        min: 1,
        type: "range",
      },
    },
    outer: {
      control: "boolean",
    },
    scaleActions: {
      control: "boolean",
    },
    title: {
      control: "text",
    },
    titleEditable: {
      control: "boolean",
    },
  },
  component: Pane,
  render: props => (
    <View padding={1} variant={Variant.Default}>
      <Pane {...props} />
    </View>
  ),
  title: "Component/Pane",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    actions: [
      {
        kind: "button",
        label: "Action 1",
      },
    ],
    children: "Pane Text Content",
    level: 1,
    outer: false,
    scaleActions: true,
    title: "Pane Title",
    titleEditable: false,
  },
} as Story;
