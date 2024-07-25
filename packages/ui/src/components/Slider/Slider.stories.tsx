import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes } from "../../storiesHelpers";
import Slider from "./Slider";

const meta: Meta<typeof Slider> = {
  argTypes: {
    clear: {
      control: {
        labels: {
          false: "False",
          fill: "Fill",
          true: "True",
        },
        type: "inline-radio",
      },
      options: [true, false, "fill"],
    },
    defaultValue: {
      control: {
        max: 100,
        min: 0,
        type: "range",
      },
    },
    id: {
      control: "text",
    },
    inverted: {
      control: "boolean",
    },
    name: {
      control: "text",
    },
    ...variantArgTypes("variant"),
  },
  component: Slider,
  decorators: [
    Story => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  title: "Component/Slider",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    defaultValue: 0,
  },
};
