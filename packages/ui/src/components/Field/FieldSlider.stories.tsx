import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Fieldset from "../Fieldset/Fieldset";
import FieldSlider from "./FieldSlider";

const meta: Meta<typeof FieldSlider> = {
  argTypes: {
    id: {
      control: "text",
    },
    label: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: FieldSlider,
  decorators: [
    Story => (
      <Fieldset>
        <Story />
      </Fieldset>
    ),
  ],
  title: "Component/Field/FieldSlider",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    id: "field-slider",
    label: "Field Label",
  },
};
