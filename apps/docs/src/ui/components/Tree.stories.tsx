import type { Meta, StoryObj } from "@storybook/react";

import { IconEnum, Tree } from "@sceneforge/ui";

const meta: Meta<typeof Tree> = {
  argTypes: {
    id: {
      control: "text",
    },
    nodes: {
      control: "object",
    },
  },
  component: Tree,
  title: "@sceneforge|ui/Components/Tree",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    id: "tree-id",
    nodes: [
      {
        expanded: true,
        icon: IconEnum.Add,
        label: "Node 1",
        nodes: [
          {
            expanded: true,
            icon: IconEnum.Globe,
            label: "Node 1.1",
            nodes: [
              {
                actions: [
                  {
                    icon: IconEnum.Visibility,
                    kind: "icon",
                    onClick: () => console.log("Visibility"),
                  },
                ],
                icon: IconEnum.DeployedCode,
                label: "Node 1.1.1",
                onClick: () => console.log("Node 1.1.1 clicked"),
              },
              {
                actions: [
                  {
                    icon: IconEnum.Visibility,
                    kind: "icon",
                    onClick: () => console.log("Visibility"),
                  },
                ],
                icon: IconEnum.DeployedCode,
                label: "Node 1.1.2",
                onClick: () => console.log("Node 1.1.2 clicked"),
              },
            ],
            onClick: () => console.log("Node 1.1 clicked"),
          },
          {
            label: "Node 1.2",
            nodes: [
              {
                actions: [
                  {
                    icon: IconEnum.Visibility,
                    kind: "icon",
                    onClick: () => console.log("Visibility"),
                  },
                ],
                label: "Node 1.2.1",
                onClick: () => console.log("Node 1.2.1 clicked"),
              },
              {
                actions: [
                  {
                    icon: IconEnum.Visibility,
                    kind: "icon",
                    onClick: () => console.log("Visibility"),
                  },
                ],
                label: "Node 1.2.2",
                onClick: () => console.log("Node 1.2.2 clicked"),
              },
            ],
            onClick: () => console.log("Node 1.2 clicked"),
          },
        ],
        onClick: () => console.log("Node 1 clicked"),
      },
      {
        label: "Node 2",
        nodes: [
          {
            label: "Node 2.1",
            nodes: [
              {
                actions: [
                  {
                    icon: IconEnum.Visibility,
                    kind: "icon",
                    onClick: () => console.log("Visibility"),
                  },
                ],
                label: "Node 2.1.1",
                onClick: () => console.log("Node 2.1.1 clicked"),
              },
              {
                actions: [
                  {
                    icon: IconEnum.Visibility,
                    kind: "icon",
                    onClick: () => console.log("Visibility"),
                  },
                ],
                label: "Node 2.1.2",
                onClick: () => console.log("Node 2.1.2 clicked"),
              },
            ],
            onClick: () => console.log("Node 2.1 clicked"),
          },
          {
            label: "Node 2.2",
            nodes: [
              {
                actions: [
                  {
                    icon: IconEnum.Visibility,
                    kind: "icon",
                    onClick: () => console.log("Visibility"),
                  },
                ],
                label: "Node 2.2.1",
                onClick: () => console.log("Node 2.2.1 clicked"),
              },
              {
                actions: [
                  {
                    icon: IconEnum.Visibility,
                    kind: "icon",
                    onClick: () => console.log("Visibility"),
                  },
                ],
                label: "Node 2.2.2",
                onClick: () => console.log("Node 2.2.2 clicked"),
              },
            ],
            onClick: () => console.log("Node 2.2 clicked"),
          },
        ],
        onClick: () => console.log("Node 2 clicked"),
      },
    ],
  },
};
