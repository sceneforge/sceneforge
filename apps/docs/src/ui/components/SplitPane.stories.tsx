import type { Meta, StoryObj } from "@storybook/react";

import { Orientation, SplitPane, Variant, View } from "@sceneforge/ui";

import { orientationArgTypes, variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof SplitPane> = {
  argTypes: {
    resizable: {
      control: "boolean",
    },
    ...orientationArgTypes("orientation"),
    ...variantArgTypes("variant"),
  },
  component: SplitPane,
  decorators: [
    Story => (
      <div
        style={{
          aspectRatio: "1.85",
          display: "block",
          isolation: "isolate",
          minWidth: "18rem",
          position: "relative",
        }}
      >
        <Story />
      </div>
    ),
  ],
  title: "@sceneforge|ui/Components/SplitPane",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children:
      [
        (<View key="child-1" variant={Variant.Accent}>Split Pane Text Content 1</View>),
        (<View key="child-2" variant={Variant.Primary}>Split Pane Text Content 2</View>),
      ],
    orientation: Orientation.Horizontal,
    resizable: false,
  },
};
