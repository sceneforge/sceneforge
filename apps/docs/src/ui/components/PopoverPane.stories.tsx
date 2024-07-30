import type { Meta, StoryObj } from "@storybook/react";

import { Button, PopoverPane, type PopoverRef } from "@sceneforge/ui";
import { useRef } from "react";

import { alignArgTypes, variantArgTypes } from "../../storiesHelpers";

const meta: Meta<typeof PopoverPane> = {
  argTypes: {
    children: {
      control: "text",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    defaultX: {
      control: "number",
      table: {
        category: "Popover",
        type: {
          summary: "number",
        },
      },
    },
    defaultY: {
      control: "number",
      table: {
        category: "Popover",
        type: {
          summary: "number",
        },
      },
    },
    headingPadding: {
      control: "number",
      if: { arg: "title", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Header",
        type: {
          summary: "number",
        },
      },
    },
    headingStyle: {
      control: "object",
      if: { arg: "title", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Header",
        type: {
          summary: "object",
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
    image: {
      control: "text",
      table: {
        category: "Pane",
        subcategory: "Image",
        type: {
          summary: "string",
        },
      },
    },
    imageAlt: {
      control: "text",
      if: { arg: "image", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Image",
        type: {
          summary: "string",
        },
      },
    },
    imageStyle: {
      control: "object",
      if: { arg: "image", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Image",
        type: {
          summary: "object",
        },
      },
    },
    level: {
      control: {
        max: 6,
        min: 1,
        type: "range",
      },
      if: { arg: "title", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Header",
        type: {
          summary: "1 | 2 | 3 | 4 | 5 | 6",
        },
      },
    },
    onTitleChange: {
      control: {
        type: "object",
      },
      if: { arg: "title", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Header",
        type: {
          summary: "function",
        },
      },
    },
    paneActions: {
      control: {
        type: "object",
      },
      table: {
        category: "Pane",
        subcategory: "Actions",
        type: {
          summary: "ActionProps[]",
        },
      },
    },
    paneActionsDense: {
      control: {
        type: "boolean",
      },
      if: { arg: "paneActions", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Actions",
        type: {
          summary: "boolean",
        },
      },
    },
    paneActionsGap: {
      control: {
        type: "number",
      },
      if: { arg: "paneActions", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Actions",
        type: {
          summary: "number",
        },
      },
    },
    paneActionsHidden: {
      control: {
        type: "boolean",
      },
      if: { arg: "paneActions", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Actions",
        type: {
          summary: "boolean",
        },
      },
    },
    paneActionsMargin: {
      control: {
        type: "number",
      },
      if: { arg: "paneActions", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Actions",
        type: {
          summary: "number",
        },
      },
    },
    paneActionsPadding: {
      control: {
        type: "number",
      },
      if: { arg: "paneActions", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Actions",
        type: {
          summary: "number",
        },
      },
    },
    paneActionsScale: {
      control: {
        type: "boolean",
      },
      if: { arg: "paneActions", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Actions",
        type: {
          summary: "boolean",
        },
      },
    },
    paneActionsStyle: {
      control: {
        type: "object",
      },
      if: { arg: "paneActions", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Actions",
        type: {
          summary: "object",
        },
      },
    },
    title: {
      control: "text",
      table: {
        category: "Pane",
        subcategory: "Header",
        type: {
          summary: "string",
        },
      },
    },
    titleEditable: {
      control: "boolean",
      if: { arg: "title", truthy: true },
      table: {
        category: "Pane",
        subcategory: "Header",
        type: {
          summary: "boolean",
        },
      },
    },
    ...variantArgTypes("variant", {
      table: {
        category: "Popover",
        type: {
          summary: "Variant",
        },
      },
    }),
    ...alignArgTypes("align", {
      table: {
        category: "Popover",
        type: {
          summary: "Align",
        },
      },
    }),
    ...alignArgTypes("verticalAlign", {
      table: {
        category: "Popover",
        type: {
          summary: "Align",
        },
      },
    }),
  },
  component: PopoverPane,
  render: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef<PopoverRef>(null);

    return (
      <>
        <Button
          aria-haspopup="dialog"
          data-testid="open-popover-pane"
          id="open-popover-pane"
          onClick={event => ref.current?.showPosition(event)}
        >
          Open Popover Pane
        </Button>
        <PopoverPane
          {...props}
          aria-labelledby="open-popover-pane"
          ref={ref}
        />
      </>
    );
  },
  title: "@sceneforge|ui/Components/PopoverPane",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "Popover Pane Content",
    level: 3,
    title: "Popover Pane Title",
  },
};
