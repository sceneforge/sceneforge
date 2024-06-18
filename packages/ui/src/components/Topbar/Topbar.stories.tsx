import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { IconEnum } from "../../types";
import Topbar from "./Topbar";

const meta: Meta<typeof Topbar> = {
  argTypes: {
    title: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: Topbar,
  title: "Component/Topbar",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    title: "Topbar Title",
  },
} as Story;

export const WithToolbar: Story = {
  args: {
    title: "Topbar Title With Toolbar",
    toolbarEnd: {
      actions: [
        {
          icon: IconEnum.Globe,
          label: "Button 3",
          type: "icon",
        },
        {
          label: "Button 4",
          type: "button",
        },
      ],
    },
    toolbarStart: {
      actions: [
        {
          label: "Button 1",
          type: "button",
        },
        {
          label: "Button 2",
          type: "button",
        },
      ],
    },
  },
};
