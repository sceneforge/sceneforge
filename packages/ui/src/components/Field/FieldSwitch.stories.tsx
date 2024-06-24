import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Fieldset from "../Fieldset/Fieldset";
import FieldSwitch from "./FieldSwitch";

const meta: Meta<typeof FieldSwitch> = {
  argTypes: {
    label: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: FieldSwitch,
  decorators: [
    Story => (
      <Fieldset>
        <Story />
      </Fieldset>
    ),
  ],
  title: "Component/Field/FieldSwitch",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    label: "Field Label",
  },
} as Story;
