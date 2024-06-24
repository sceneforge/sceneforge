import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Fieldset from "../Fieldset/Fieldset";
import Field from "./Field";

const meta: Meta<typeof Field> = {
  argTypes: {
    children: {
      control: "text",
    },
    label: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: Field,
  decorators: [
    Story => (
      <Fieldset>
        <Story />
      </Fieldset>
    ),
  ],
  title: "Component/Field",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Field Text Content",
    label: "Field Label",
  },
} as Story;
