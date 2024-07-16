import type { Meta, StoryObj } from "@storybook/react";

import { Orientation, Unlisted, UnlistedItem } from "@sceneforge/ui";

import { orientationArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof Unlisted> = {
  argTypes: {
    gap: {
      control: "number",
    },
    ...orientationArgTypes("orientation"),
  },
  component: Unlisted,
  title: "@sceneforge|ui/Components/Unlisted",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: (
      <>
        <UnlistedItem key="unlisted-1">Unlisted Item 1</UnlistedItem>
        <UnlistedItem key="unlisted-2">Unlisted Item 2</UnlistedItem>
        <UnlistedItem key="unlisted-3">Unlisted Item 3</UnlistedItem>
      </>
    ),
    orientation: Orientation.Vertical,
  },
};
