import type { Meta, StoryObj } from "@storybook/react";

import { Form } from "@sceneforge/ui";

import { variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof Form> = {
  argTypes: {
    columns: {
      control: "number",
    },
    fieldsets: {
      control: "object",
    },
    gap: {
      control: "number",
    },
    reset: {
      control: "text",
    },
    submit: {
      control: "text",
    },
    ...variantArgTypes("variant"),
  },
  component: Form,
  decorators: [
    Story => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  title: "@sceneforge|ui/Components/Form",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    fieldsets: [
      {
        fields: [
          {
            label: "Select Field Label",
            options: [
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ],
            type: "select",
          },
          {
            label: "Switch Field Label",
            type: "switch",
          },
        ],
        legend: "Fieldset 1 Legend",
      },
      {
        fields: [
          {
            label: "Text Field Label",
          },
        ],
        legend: "Fieldset 2 Legend",
      },
    ],
  },
};
