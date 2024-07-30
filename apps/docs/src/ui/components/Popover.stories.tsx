import type { Meta, StoryObj } from "@storybook/react";

import { Button, Popover, type PopoverRef } from "@sceneforge/ui";
import { useRef } from "react";

import { alignArgTypes, variantArgTypes } from "../../storiesHelpers";
import ViewMeta from "./View.stories";

const meta: Meta<typeof Popover> = {
  argTypes: {
    ...ViewMeta.argTypes,
    defaultX: {
      control: "number",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    defaultY: {
      control: "number",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    id: {
      control: "text",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    ref: {
      table: {
        type: {
          summary: "Ref<PopoverRef>",
        },
      },
    },
    style: {
      control: "object",
      table: {
        type: {
          detail: ["StyleXStylesWithout<{",
            "  bottom: unknown;",
            "  display: unknown;",
            "  inset: unknown;",
            "  insetBlock: unknown;",
            "  insetBlockEnd: unknown;",
            "  insetBlockStart: unknown;",
            "  insetInline: unknown;",
            "  insetInlineEnd: unknown;",
            "  insetInlineStart: unknown;",
            "  left: unknown;",
            "  position: unknown;",
            "  right: unknown;",
            "  top: unknown;",
            "}>"].join("\n"),
          summary: "StyleXStylesWithout<...>",
        },
      },
    },
    ...variantArgTypes("variant", {
      table: {
        type: {
          summary: "Variant",
        },
      },
    }),
    ...alignArgTypes("align", {
      table: {
        type: {
          summary: "Align",
        },
      },
    }),
    ...alignArgTypes("verticalAlign", {
      table: {
        type: {
          summary: "Align",
        },
      },
    }),
  },
  component: Popover,
  render: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef<PopoverRef>(null);

    return (
      <>
        <Button
          aria-haspopup="dialog"
          data-testid="open-popover"
          id="open-popover"
          onClick={event => ref.current?.showPosition(event)}
        >
          Open Popover
        </Button>
        <Popover
          {...props}
          aria-labelledby="open-popover"
          ref={ref}
        />
      </>
    );
  },
  title: "@sceneforge|ui/Components/Popover",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Popover Content",
  },
};
