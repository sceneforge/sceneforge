import type { Meta, StoryObj } from "@storybook/react";

import { CollapsibleList, IconEnum, Variant } from "@sceneforge/ui";

import { variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof CollapsibleList> = {
  argTypes: {
    ...variantArgTypes("variant"),
  },
  component: CollapsibleList,
  decorators: [
    Story => (
      <div style={{
        height: "400px",
        minHeight: "400px",
        minWidth: "250px",
        width: "250px",
      }}
      >
        <Story />
      </div>
    ),
  ],
  title: "@sceneforge|ui/Components/CollapsibleList",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    items: [
      {
        children: "Collapsible 1 Text Content",
        icon: IconEnum.Globe,
        title: "Collapsible 1 Title",
      },
      {
        children: "Collapsible 2 Text Content",
        icon: IconEnum.Settings,
        title: "Collapsible 2 Title",
      },
      {
        children: "Collapsible 3 Text Content",
        icon: IconEnum.LightbulbOutline,
        title: "Collapsible 3 Title",
      },
    ],
    variant: Variant.Primary,
  },
};
