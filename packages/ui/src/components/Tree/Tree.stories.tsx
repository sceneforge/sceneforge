import type { Meta, StoryObj } from "@storybook/react";

import { IconEnum } from "../../types";
import Tree from "./Tree";

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
  decorators: [
    Story => (
      <>
        <div
          style={{
            alignContent: "center",
            backgroundAttachment: "fixed",
            backgroundBlendMode: "screen",
            backgroundColor: "color-mix(in srgb, Canvas 10%, transparent)",
            backgroundImage: "conic-gradient(from 0deg, #ffadad, #ffd6a5, #fdffb6, #caffbf, #9bf6ff, #a0c4ff, #bdb2ff, #ffc6ff, #ffadad)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            filter: "blur(1.5rem) brightness(1.1)",
            inset: 0,
            overflow: "hidden",
            position: "absolute",
            textAlign: "center",
            zIndex: -1,
          }}
        />
        <Story />
      </>
    ),
    Story => (
      <div
        style={{
          aspectRatio: "1.85",
          display: "block",
          isolation: "isolate",
          minWidth: "18rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
  title: "Component/Tree",
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
} as Story;
