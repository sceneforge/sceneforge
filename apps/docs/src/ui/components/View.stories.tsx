import type { Meta, StoryObj } from "@storybook/react";

import { View } from "@sceneforge/ui";

import { shapeArgTypes, variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof View> = {
  argTypes: {
    children: {
      control: "text",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    hidden: {
      control: "boolean",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    inverted: {
      control: "boolean",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    margin: {
      control: "number",
      table: {
        type: {
          summary: "SpacerStyleProps",
        },
      },
    },
    padding: {
      control: "number",
      table: {
        type: {
          summary: "SpacerStyleProps",
        },
      },
    },
    ref: {
      table: {
        type: {
          summary: "Ref<HTMLDivElement>",
        },
      },
    },
    scrollable: {
      control: "inline-radio",
      options: [true, false, "inline", "block"],
      table: {
        type: {
          summary: "boolean | \"block\" | \"inline\"",
        },
      },
    },
    style: {
      table: {
        type: {
          summary: "StyleXStyles",
        },
      },
    },
    ...shapeArgTypes("shape", {
      table: {
        type: {
          summary: "Shape",
        },
      },
    }),
    ...variantArgTypes("variant", {
      table: {
        type: {
          summary: "Variant",
        },
      },
    }),
  },
  component: View,
  title: "@sceneforge|ui/Components/View",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "View Text Content",
  },
};
