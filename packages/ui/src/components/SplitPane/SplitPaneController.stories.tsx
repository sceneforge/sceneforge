import type { Meta, StoryObj } from "@storybook/react";

import { orientationArgTypes as orientationArgumentTypes } from "../../storiesHelpers";
import { Orientation, Variant } from "../../types";
import Button from "../Button/Button";
import View from "../View/View";
import SplitPaneController from "./SplitPaneController";

const meta: Meta<typeof SplitPaneController> = {
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
  component: SplitPaneController,
  decorators: [Story => (
    <div style={{ height: "360px", width: "480px" }}>
      <Story />
    </div>
  )],
  title: "Component/SplitPaneController",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children:
      [
        (<View key="child-1" variant={Variant.Default}>Split Pane Text Content One</View>),
        (<View key="child-2" variant={Variant.Accent}>Split Pane Text Content Two</View>),
        (
          <View key="child-3" variant={Variant.Info}>
            Split Pane Text Content
            <Button variant={Variant.Danger}>Three</Button>
          </View>
        ),
      ],
    orientation: Orientation.Horizontal,
    resizable: true,
  },
} as Story;
