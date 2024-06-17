import type { Meta, StoryObj } from '@storybook/react';
import SplitPaneController from './SplitPaneController';
import { Orientation, Variant } from '../../types';
import View from '../View/View';
import Button from '../Button/Button';
import { orientationArgTypes } from '../../storiesHelpers';

const meta: Meta<typeof SplitPaneController> = {
  title: 'Component/SplitPaneController',
  component: SplitPaneController,
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
  decorators: [(Story) => (
    <div style={{ width: "480px", height: "360px" }}>
      <Story />
    </div>
  )],
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    resizable: true,
    orientation: Orientation.Horizontal,
    children:
      [
        (<View key="child-1" variant={Variant.Default}>Split Pane Text Content One</View>),
        (<View key="child-2" variant={Variant.Accent}>Split Pane Text Content Two</View>),
        (<View key="child-3" variant={Variant.Info}>Split Pane Text Content <Button variant={Variant.Danger}>Three</Button></View>),
      ],
  },
} as Story;
