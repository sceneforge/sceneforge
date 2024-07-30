import type { Meta, StoryObj } from "@storybook/react";

import { shapeArgTypes, variantArgTypes } from "../../storiesHelpers";
import { Shape, Variant } from "../../types";
import Heading from "../Heading/Heading";
import View from "./View";

const meta: Meta<typeof View> = {
  argTypes: {
    children: {
      control: "text",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    hidden: {
      control: "boolean",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    inverted: {
      control: "boolean",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    margin: {
      control: "number",
      table: {
        type: {
          summary: "SpacerStyleProps",
        },
      },
    },
    padding: {
      control: "number",
      table: {
        type: {
          summary: "SpacerStyleProps",
        },
      },
    },
    ref: {
      table: {
        type: {
          summary: "Ref<HTMLDivElement>",
        },
      },
    },
    scrollable: {
      control: "inline-radio",
      options: [true, false, "inline", "block"],
      table: {
        type: {
          summary: "boolean | \"block\" | \"inline\"",
        },
      },
    },
    style: {
      table: {
        type: {
          summary: "StyleXStyles",
        },
      },
    },
    ...shapeArgTypes("shape", {
      table: {
        type: {
          summary: "Shape",
        },
      },
    }),
    ...variantArgTypes("variant", {
      table: {
        type: {
          summary: "Variant",
        },
      },
    }),
  },
  component: View,
  title: "Component/View",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: "View Text Content",
  },
};

export const Circle: Story = {
  args: {
    children: "View Text Content",
    shape: Shape.Circle,
    variant: Variant.Success,
  },
  decorators: [
    Story => (
      <div style={{ height: "200px", width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Rounded: Story = {
  args: {
    children: "View Text Content",
    shape: Shape.Rounded,
    variant: Variant.Info,
  },
  decorators: [
    Story => (
      <div style={{ height: "200px", width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Squircle: Story = {
  args: {
    children: "View Text Content",
    shape: Shape.Squircle,
    variant: Variant.Accent,
  },
  decorators: [
    Story => (
      <div style={{ height: "200px", width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

export const ScrollableBlock: Story = {
  args: {
    children: (
      <>
        <p>
          Lorem ipsum dolor sit amet
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id
          nisl purus. Morbi faucibus facilisis risus, eget fermentum velit
          efficitur ut. Aliquam erat volutpat. In vel sodales mi. Praesent
          mauris nisl, maximus sed convallis et, molestie sit amet lacus. Etiam
          rhoncus consequat felis, facilisis sagittis risus varius in. Duis
          ultricies rhoncus lacus, nec commodo ipsum ullamcorper eu.
        </p>
        <p>
          Duis a pharetra neque, ac dictum ipsum. Nunc mauris ex, molestie
          accumsan eleifend sed, commodo quis eros. Quisque faucibus, ante a
          efficitur posuere, ligula ex eleifend tortor, a viverra enim lorem nec
          odio. Sed suscipit felis sit amet neque porttitor, vitae sagittis ante
          maximus. Proin nisi tellus, convallis a vehicula in, semper vitae
          ligula. Proin fermentum aliquam orci eget dignissim. Nam vel accumsan
          ligula, sed interdum tortor.
        </p>
        <p>
          Mauris fringilla tellus molestie ligula auctor, sit amet imperdiet
          ipsum porta. Aliquam erat volutpat. Maecenas molestie sed libero a
          ultricies. Fusce eu enim scelerisque lacus laoreet rutrum nec sed
          massa. In hac habitasse platea dictumst. Nam commodo mollis enim, eu
          aliquet odio pellentesque nec. Nam pharetra mattis elementum. In orci
          mi, gravida ac finibus a, interdum sit amet sapien. Curabitur nibh
          erat, porta nec elementum at, pharetra congue metus. Donec vestibulum
          turpis at metus egestas scelerisque. Curabitur aliquet mauris at magna
          posuere euismod. Vivamus eleifend placerat nibh, a laoreet est porta
          rhoncus. Donec at congue massa.
        </p>
        <p>
          Donec vestibulum tortor nec enim consectetur, ac semper quam semper.
          Duis viverra aliquam augue vel vulputate. Phasellus interdum congue
          tempor. Maecenas laoreet vulputate dignissim. Cras vitae erat nulla.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Nunc a sollicitudin risus. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Curabitur ornare est
          id mauris rhoncus imperdiet. Nulla dui dui, mattis eu iaculis ac,
          hendrerit eget odio. Duis tincidunt nunc non enim lacinia malesuada.
          Fusce a semper eros. In hac habitasse platea dictumst.
        </p>
      </>
    ),
    padding: 1,
    scrollable: "block",
    variant: Variant.Primary,
  },
  decorators: [
    Story => (
      <div style={{ height: "300px", width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

export const scrollableInline: Story = {
  args: {
    children: (
      <div
        style={{
          alignContent: "stretch",
          display: "grid",
          gap: "1rem",
          gridAutoColumns: "100%",
          gridAutoFlow: "column",
          height: "100%",
          justifyContent: "stretch",
          width: "100%",
        }}
      >
        <View padding={1}>
          <Heading level={2}>1</Heading>
        </View>
        <View padding={1}>
          <Heading level={2}>2</Heading>
        </View>
        <View padding={1}>
          <Heading level={2}>3</Heading>
        </View>
        <View padding={1}>
          <Heading level={2}>4</Heading>
        </View>
        <View padding={1}>
          <Heading level={2}>5</Heading>
        </View>
      </div>
    ),
    padding: 1,
    scrollable: "inline",
    variant: Variant.Accent,
  },
  decorators: [
    Story => (
      <div style={{ height: "200px", width: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export const ScrollableBoth: Story = {
  args: {
    children: (
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "165px 165px",
          gridTemplateRows: "165px 165px",
        }}
      >
        <View padding={1} variant={Variant.Primary} />
        <View padding={1} variant={Variant.Accent} />
        <View padding={1} variant={Variant.Info} />
        <View padding={1} variant={Variant.Danger} />
      </div>
    ),
    padding: 1,
    scrollable: true,
  },
  decorators: [
    Story => (
      <div style={{ height: "200px", width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};
