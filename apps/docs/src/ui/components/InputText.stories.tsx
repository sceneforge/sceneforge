import type { Meta, StoryObj } from "@storybook/react";

import { InputText, View } from "@sceneforge/ui";

import { variantArgTypes } from "../../storiesHelpers";

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
    ...variantArgTypes("variant"),
  },
  component: InputText,
  decorators: [
    Story => (
      <View padding={10}>
        <Story />
      </View>
    ),
  ],
  title: "@sceneforge|ui/Components/InputText",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
  },
};
