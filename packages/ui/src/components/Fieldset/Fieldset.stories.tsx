import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Fieldset from "./Fieldset";

const meta: Meta<typeof Fieldset> = {
  argTypes: {
    children: {
      control: "text",
    },
    legend: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: Fieldset,
  decorators: [
    Story => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  title: "Component/Fieldset",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Fieldset Text Content",
  },
} as Story;
