import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import View from "../View/View";
import InputText from "./InputText";

const meta: Meta<typeof InputText> = {
  argTypes: {
    defaultValue: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
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
  component: InputText,
  decorators: [
    Story => (
      <View padding={10}>
        <Story />
      </View>
    ),
  ],
  title: "Component/InputText",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
  },
};
