import type { Meta, StoryObj } from "@storybook/react";

import { Pane, Variant, View } from "@sceneforge/ui";

const meta: Meta<typeof Pane> = {
  argTypes: {
    actions: {
      control: "object",
    },
    actionsScale: {
      control: "boolean",
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
    title: {
      control: "text",
    },
    titleEditable: {
      control: "boolean",
    },
  },
  component: Pane,
  render: props => (
    <View padding={1} variant={Variant.Primary}>
      <Pane {...props} />
    </View>
  ),
  title: "@sceneforge|ui/Components/Pane",
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
    actionsScale: true,
    children: "Pane Text Content",
    level: 1,
    outer: false,
    title: "Pane Title",
    titleEditable: false,
  },
};
