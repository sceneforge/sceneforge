import type { Meta, StoryObj } from "@storybook/react";

import { orientationArgTypes as orientationArgumentTypes } from "../../storiesHelpers";
import { Orientation, Variant } from "../../types";
import View from "../View/View";
import SplitPane from "./SplitPane";

const meta: Meta<typeof SplitPane> = {
  argTypes: {
    resizable: {
      control: "boolean",
    },
    ...orientationArgumentTypes("orientation"),
    children: {
      table: {
        disable: true,
      },
    },
  },
  component: SplitPane,
  render: (args) => {
    return (
      <div style={{ minHeight: "30rem", minWidth: "80rem" }}>
        <SplitPane {...args} />
      </div>
    );
  },
  title: "Component/SplitPane",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children:
      [
        (<View key="child-1" variant={Variant.Accent}>Split Pane Text Content 1</View>),
        (<View key="child-2" variant={Variant.Default}>Split Pane Text Content 2</View>),
      ],
    orientation: Orientation.Horizontal,
    resizable: false,
  },
} as Story;
