import type { Meta, StoryObj } from '@storybook/react';
import Tree from './Tree';
import { IconEnum } from '../../types';

const meta: Meta<typeof Tree> = {
  title: 'Component/Tree',
  component: Tree,
  argTypes: {
    id: {
      control: 'text',
    },
    nodes: {
      control: 'object'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', backgroundColor: "#22AAFF" }}>
        <Story />
      </div>
    )
  ]
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    id: "tree-id",
    nodes: [
      {
        label: "Node 1",
        icon: IconEnum.Add,
        expanded: true,
        onClick: () => console.log("Node 1 clicked"),
        nodes: [
          {
            label: "Node 1.1",
            icon: IconEnum.Globe,
            expanded: true,
            onClick: () => console.log("Node 1.1 clicked"),
            nodes: [
              {
                label: "Node 1.1.1",
                icon: IconEnum.DeployedCode,
                onClick: () => console.log("Node 1.1.1 clicked"),
                actions: [
                  {
                    type: "icon",
                    icon: IconEnum.Visibility,
                    onClick: () => console.log("Visibility")
                  }
                ]
              },
              {
                label: "Node 1.1.2",
                icon: IconEnum.DeployedCode,
                onClick: () => console.log("Node 1.1.2 clicked"),
                actions: [
                  {
                    type: "icon",
                    icon: IconEnum.Visibility,
                    onClick: () => console.log("Visibility")
                  }
                ]
              }
            ]
          },
          {
            label: "Node 1.2",
            onClick: () => console.log("Node 1.2 clicked"),
            nodes: [
              {
                label: "Node 1.2.1",
                onClick: () => console.log("Node 1.2.1 clicked"),
                actions: [
                  {
                    type: "icon",
                    icon: IconEnum.Visibility,
                    onClick: () => console.log("Visibility")
                  }
                ]
              },
              {
                label: "Node 1.2.2",
                onClick: () => console.log("Node 1.2.2 clicked"),
                actions: [
                  {
                    type: "icon",
                    icon: IconEnum.Visibility,
                    onClick: () => console.log("Visibility")
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        label: "Node 2",
        onClick: () => console.log("Node 2 clicked"),
        nodes: [
          {
            label: "Node 2.1",
            onClick: () => console.log("Node 2.1 clicked"),
            nodes: [
              {
                label: "Node 2.1.1",
                onClick: () => console.log("Node 2.1.1 clicked"),
                actions: [
                  {
                    type: "icon",
                    icon: IconEnum.Visibility,
                    onClick: () => console.log("Visibility")
                  }
                ]
              },
              {
                label: "Node 2.1.2",
                onClick: () => console.log("Node 2.1.2 clicked"),
                actions: [
                  {
                    type: "icon",
                    icon: IconEnum.Visibility,
                    onClick: () => console.log("Visibility")
                  }
                ]
              }
            ]
          },
          {
            label: "Node 2.2",
            onClick: () => console.log("Node 2.2 clicked"),
            nodes: [
              {
                label: "Node 2.2.1",
                onClick: () => console.log("Node 2.2.1 clicked"),
                actions: [
                  {
                    type: "icon",
                    icon: IconEnum.Visibility,
                    onClick: () => console.log("Visibility")
                  }
                ]
              },
              {
                label: "Node 2.2.2",
                onClick: () => console.log("Node 2.2.2 clicked"),
                actions: [
                  {
                    type: "icon",
                    icon: IconEnum.Visibility,
                    onClick: () => console.log("Visibility")
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
} as Story;
