import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { IconEnum } from "../../types";
import Topbar from "./Topbar";

const meta: Meta<typeof Topbar> = {
  argTypes: {
    shadow: {
      control: "boolean",
    },
    title: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: Topbar,
  decorators: [
    Story => (
      <div
        style={{
          aspectRatio: "21 / 3",
          display: "block",
          minWidth: "50dvw",
        }}
      >
        <Story />
      </div>
    ),
  ],
  title: "Component/Topbar",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    shadow: true,
    title: "Topbar Title",
  },
} as Story;

export const WithToolbar: Story = {
  args: {
    shadow: true,
    title: "Topbar Title With Toolbar",
    toolbarEnd: {
      actions: [
        {
          icon: IconEnum.Globe,
          kind: "icon",
          label: "Button 3",
        },
        {
          kind: "button",
          label: "Button 4",
        },
      ],
    },
    toolbarStart: {
      actions: [
        {
          kind: "button",
          label: "Button 1",
        },
        {
          kind: "button",
          label: "Button 2",
        },
      ],
    },
  },
};
