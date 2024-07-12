import type { Meta, StoryObj } from "@storybook/react";

import { iconArgTypes, variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import { Variant } from "../../types";
import Collapsible from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
  argTypes: {
    children: {
      control: "text",
    },
    contentMargin: {
      control: "number",
    },
    contentPadding: {
      control: "number",
    },
    open: {
      control: "boolean",
    },
    style: {
      table: {
        disable: true,
      },
    },
    title: {
      control: "text",
    },
    ...iconArgTypes("icon"),
    ...variantArgumentTypes("variant"),
  },
  component: Collapsible,
  decorators: [
    Story => (
      <div style={{
        height: "400px",
        minHeight: "400px",
        minWidth: "250px",
        width: "250px",
      }}
      >
        <Story />
      </div>
    ),
  ],
  title: "Component/Collapsible",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Collapsible Text Content",
    title: "Collapsible Title",
  },
  decorators: [
    Story => (
      <div style={{
        height: "400px",
        minHeight: "400px",
        minWidth: "250px",
        width: "250px",
      }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Horizontal: Story = {
  args: {
    children: "Collapsible Text Content",
    title: "Collapsible Title",
    variant: Variant.Accent,
  },
};

export const Nested: Story = {
  args: {
    children: (
      <>
        <Collapsible
          contentPadding={0.25}
          title="Nested Collapsible Title"
          variant={Variant.Accent}
        >
          <Collapsible
            contentPadding={0.25}
            title="Deep Nested Collapsible Title"
            variant={Variant.Info}
          >
            Deep Nested Collapsible Content Text
          </Collapsible>
          Nested Collapsible Content Text
        </Collapsible>
        <Collapsible
          contentPadding={0.25}
          title="Second Nested Collapsible Title"
          variant={Variant.Warning}
        >
          <Collapsible
            contentPadding={0.25}
            title="Second Deep Nested Collapsible Title"
            variant={Variant.Success}
          >
            Second Deep Nested Collapsible Content Text
          </Collapsible>
          Second Nested Collapsible Content Text
        </Collapsible>
        Collapsible Content Text
      </>
    ),
    contentPadding: 0.25,
    title: "Collapsible Title",
    variant: Variant.Primary,
  },
};
