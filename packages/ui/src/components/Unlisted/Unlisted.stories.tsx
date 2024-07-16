import type { Meta, StoryObj } from "@storybook/react";

import { orientationArgTypes } from "../../storiesHelpers";
import { Orientation } from "../../types";
import Unlisted from "./Unlisted";
import UnlistedItem from "./UnlistedItem";

const meta: Meta<typeof Unlisted> = {
  argTypes: {
    gap: {
      control: "number",
    },
    ...orientationArgTypes("orientation"),
  },
  component: Unlisted,
  title: "Component/Unlisted",
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
