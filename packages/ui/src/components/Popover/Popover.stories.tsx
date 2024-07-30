import type { Meta, StoryObj } from "@storybook/react";

import { expect, userEvent, within } from "@storybook/test";
import { useRef } from "react";

import type { PopoverRef } from "../Popover";

import { alignArgTypes, variantArgTypes } from "../../storiesHelpers";
import Button from "../Button/Button";
import ViewMeta from "../View/View.stories";
import Popover from "./Popover";

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
          data-testid="open-hotspot-input"
          id="open-hotspot-input"
          onClick={event => ref.current?.showPosition(event)}
        >
          Open Hotspot Input
        </Button>
        <Popover
          {...props}
          aria-labelledby="open-hotspot-input"
          ref={ref}
        />
      </>
    );
  },
  title: "Component/Popover",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Popover Content",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId("open-hotspot-input"));

    await expect(canvas.getByRole("alertdialog")).toBeVisible();
  },
};
