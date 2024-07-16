import type { Meta, StoryObj } from "@storybook/react";

import { variantArgTypes as variantArgumentTypes } from "../../storiesHelpers";
import Link from "./Link";

const meta: Meta<typeof Link> = {
  argTypes: {
    children: {
      control: "text",
    },
    href: {
      control: "text",
    },
    ...variantArgumentTypes("variant"),
  },
  component: Link,
  title: "Component/Link",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Link Text Content",
    href: "#",
  },
} as Story;
