import type { Meta, StoryObj } from "@storybook/react";

import { orientationArgTypes as orientationArgumentTypes, variantArgTypes } from "../../storiesHelpers";
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
    ...variantArgTypes("variant"),
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
        (<View key="child-1">Split Pane Text Content One</View>),
        (<View key="child-2">Split Pane Text Content Two</View>),
        (
          <View key="child-3">
            Split Pane Text Content
            <Button variant={Variant.Danger}>Three</Button>
          </View>
        ),
      ],
    orientation: Orientation.Horizontal,
    resizable: true,
  },
} as Story;
