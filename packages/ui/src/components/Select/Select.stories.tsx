import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { Variant } from "../../types";
import View from "../View/View";
import Select from "./Select";

const meta: Meta<typeof Select> = {
  argTypes: {
    defaultValue: {
      control: "text",
    },
    dense: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    glossy: {
      control: "boolean",
    },
    inverted: {
      control: "boolean",
    },
    name: {
      control: "text",
    },
    options: {
      control: "object",
    },
    readOnly: {
      control: "boolean",
    },
    ref: {
      table: {
        disable: true,
      },
    },
    ...variantArgumentTypes("variant"),
  },
  component: Select,
  decorators: [
    Story => (
      <View padding={10}>
        <Story />
      </View>
    ),
  ],
  title: "Component/Select",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ],
    variant: Variant.Primary,
  },
};
