import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Fieldset from "../Fieldset/Fieldset";
import FieldSelect from "./FieldSelect";

const meta: Meta<typeof FieldSelect> = {
  argTypes: {
    label: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: FieldSelect,
  decorators: [
    Story => (
      <Fieldset>
        <Story />
      </Fieldset>
    ),
  ],
  title: "Component/Field/FieldSelect",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    label: "Field Label",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
  },
} as Story;
