import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Fieldset from "../Fieldset/Fieldset";
import FieldText from "./FieldText";

const meta: Meta<typeof FieldText> = {
  argTypes: {
    label: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: FieldText,
  decorators: [
    Story => (
      <Fieldset>
        <Story />
      </Fieldset>
    ),
  ],
  title: "Component/Field/FieldText",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    label: "Field Label",
  },
} as Story;
