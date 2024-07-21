import type { Meta, StoryObj } from "@storybook/react";

import { Variant } from "../../types";
import View from "../View/View";
import Grid from "./Grid";

const meta: Meta<typeof Grid> = {
  argTypes: {
    columns: {
      control: {
        type: "number",
      },
    },
    columnsSize: {
      control: {
        type: "number",
      },
    },
    columnsTrack: {
      control: {
        type: "text",
      },
    },
    gap: {
      control: {
        type: "number",
      },
    },
    rows: {
      control: {
        type: "number",
      },
    },
    rowsSize: {
      control: {
        type: "number",
      },
    },
    rowsTrack: {
      control: {
        type: "text",
      },
    },
  },
  component: Grid,
  title: "Component/Grid",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    children: (
      <>
        <View padding={1} variant={Variant.Accent}>Row 1 Col 1 View 1</View>
        <View padding={1} variant={Variant.Info}>Row 1 Col 2 View 2</View>
        <View padding={1} variant={Variant.Primary}>Row 1 Col 3 View 3</View>
        <View padding={1} variant={Variant.Accent}>Row 2 Col 1 View 4</View>
        <View padding={1} variant={Variant.Info}>Row 2 Col 2 View 5</View>
        <View padding={1} variant={Variant.Primary}>Row 2 Col 3 View 6</View>
        <View padding={1} variant={Variant.Accent}>Row 3 Col 1 View 7</View>
        <View padding={1} variant={Variant.Info}>Row 3 Col 2 View 8</View>
        <View padding={1} variant={Variant.Primary}>Row 3 Col 3 View 9</View>
      </>
    ),
    columns: 3,
    gap: 2,
  },
};
