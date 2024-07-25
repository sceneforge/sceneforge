import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Fieldset from "../Fieldset/Fieldset";
import FieldColor from "./FieldColor";

const meta: Meta<typeof FieldColor> = {
  argTypes: {
    label: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: FieldColor,
  decorators: [
    Story => (
      <Fieldset>
        <Story />
      </Fieldset>
    ),
  ],
  title: "Component/Field/FieldColor",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    defaultValue: "#FF0000",
    label: "Field Label",
  },
} as Story;
