import type { Meta, StoryObj } from '@storybook/react';
import SplitPane from './SplitPane';
import { Orientation, Variant } from '../../types';
import View from '../View/View';
import { orientationArgTypes } from '../storiesHelpers';

const meta: Meta<typeof SplitPane> = {
  title: 'Component/SplitPane',
  component: SplitPane,
  argTypes: {
    resizable: {
      control: 'boolean',
    },
    ...orientationArgTypes("orientation"),
    children: {
      table: {
        disable: true,
      }
    },
  },
  render: (args) => {
    return (
      <div style={{ minWidth: "80rem", minHeight: "30rem" }}>
        <SplitPane {...args} />
      </div>
    );
  }
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    resizable: false,
    orientation: Orientation.Horizontal,
    children:
      [
        (<View key="child-1" variant={Variant.Accent}>Split Pane Text Content 1</View>),
        (<View key="child-2" variant={Variant.Default}>Split Pane Text Content 2</View>)
      ],
  },
} as Story;
