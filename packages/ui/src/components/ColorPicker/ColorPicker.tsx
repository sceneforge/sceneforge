import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { lazy } from "react";

import { borderStyles } from "../../borders.stylex";
import { elevationStyles, insetShadowStyles } from "../../shadow.stylex";
import { Shape } from "../../types";
import { Button, type ButtonProps } from "../Button";
import { View } from "../View";
import { useColorPicker } from "./useColorPicker";

export type ColorPickerProps = {
  defaultValue?: string;
  name?: string;
  popoverStyle?: StyleXStyles;
} & Omit<ButtonProps, "children" | "onClick" | "onToggle" | "type">;

const ColorConfig = lazy(() => import("./ColorConfig"));

const styles = stylex.create({
  anchor: (id: string) => ({
    anchorName: `--color-picker-anchor-${id.replaceAll(":", "-")}`,
  }),
  background: (hue: number, saturation: number, lightness: number) => ({
    backgroundColor: `hsl(${hue}deg ${saturation}% ${lightness}%)`,
  }),
  button: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    justifyContent: "stretch",
  },
  colorIcon: {
    aspectRatio: 1,
    flexGrow: 0,
    flexShrink: 1,
    height: null,
    width: "1.25rem",
  },
  popover: (id: string) => ({
    positionAnchor: `--color-picker-anchor-${id.replaceAll(":", "-")}`,
  }),
  view: {
    display: null,
    height: null,
    insetArea: "span-block-end",
    insetBlockStart: "anchor(bottom)",
    overflowX: null,
    overflowY: null,
    position: "absolute",
    width: null,
  },
});

const ColorPicker = ({
  defaultValue,
  id,
  label,
  name,
  popoverStyle,
  style,
  variant,
  ...props
}: ColorPickerProps) => {
  const {
    currentId,
    currentInputId,
    currentViewId,
    hue,
    lightness,
    saturation,
    setLightness,
    setSaturation,
    setSetHue,
    value,
  } = useColorPicker({
    defaultValue,
    id,
  });

  return (
    <>
      <input
        id={currentInputId}
        name={name}
        type="hidden"
        value={value}
      />
      <Button
        id={currentId}
        popoverTarget={currentViewId}
        popoverTargetAction="toggle"
        {...props}
        style={[
          styles.anchor(currentId) as StyleXStyles,
          styles.button,
          style,
        ]}
        variant={variant}
      >
        <View
          shape={Shape.Rounded}
          style={[
            styles.colorIcon,
            styles.background(hue, saturation, lightness),
            insetShadowStyles.default,
            popoverStyle,
          ]}
        />
        {label && (
          <span>
            {label}
          </span>
        )}
      </Button>
      <View
        id={currentViewId}
        popover="auto"
        shape={Shape.Rounded}
        style={[
          borderStyles.border,
          variant && borderStyles.borderVariant(variant, 50),
          !variant && borderStyles.borderDefault(50),
          borderStyles.borderSize(1),
          styles.view,
          styles.popover(currentId) as StyleXStyles,
          elevationStyles.default(3),
        ]}
      >
        <ColorConfig
          defaultHue={hue}
          defaultLightness={lightness}
          defaultSaturation={saturation}
          id={`${currentId}-hsl`}
          onHueChange={setSetHue}
          onLightnessChange={setLightness}
          onSaturationChange={setSaturation}
          variant={variant}
        />
      </View>
    </>
  );
};

export default ColorPicker;
