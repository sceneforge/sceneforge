import type { StyleXStylesWithout } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";

import type { Variant } from "../../types";

import { borderStyles, roundedStyles } from "../../borders.stylex";
import { backgroundStyles, textColorStyles } from "../../colors.stylex";
import { outlineInteractiveStyles } from "../../effect.stylex";
import { insetAndElevationStyles, insetShadowStyles } from "../../shadow.stylex";
import { View } from "../View";
import { useSlider } from "./useSlider";

export type SliderProps = {
  clear?: "fill" | boolean;
  defaultValue?: number;
  handleStyle?: StyleXStylesWithout<{
    bottom: unknown;
    height: unknown;
    inset: unknown;
    insetBlock: unknown;
    insetBlockEnd: unknown;
    insetBlockStart: unknown;
    insetInline: unknown;
    insetInlineEnd: unknown;
    insetInlineStart: unknown;
    left: unknown;
    position: unknown;
    right: unknown;
    top: unknown;
    width: unknown;
  }>;
  hidden?: boolean;
  id?: string;
  inverted?: boolean;
  name?: string;
  onChange?: (value: number) => void;
  onImediateChange?: (value: number) => void;
  step?: number;
  style?: StyleXStylesWithout<{
    display: unknown;
    overflow: unknown;
    overflowX: unknown;
    overflowY: unknown;
    position: unknown;
    touchAction: unknown;
  }>;
  valueStyle?: StyleXStylesWithout<{
    bottom: unknown;
    height: unknown;
    inset: unknown;
    insetBlock: unknown;
    insetBlockEnd: unknown;
    insetBlockStart: unknown;
    insetInline: unknown;
    insetInlineEnd: unknown;
    insetInlineStart: unknown;
    left: unknown;
    position: unknown;
    right: unknown;
    top: unknown;
    width: unknown;
  }>;
  variant?: Variant;
};

const styles = stylex.create({
  container: {
    height: "1rem",
    minWidth: "8.5rem",
    overflowX: null,
    overflowY: null,
    position: "relative",
    touchAction: "pan-x",
    width: "100%",
  },
  grabbing: {
    cursor: "grabbing",
  },
  hidden: {
    display: "none",
  },
  nonInteractive: {
    pointerEvents: "none",
    touchAction: "none",
  },
  picker: {
    cursor: {
      ":active": "grabbing",
      "default": "grab",
    },
    height: null,
    insetBlock: "-0.125rem",
    position: "absolute",
    scale: {
      ":focus-visible": 1.125,
      ":hover": 1.25,
      "default": 1,
    },
    transition: "scale 0.2s ease-in-out",
    translate: "-50% 0",
    width: null,
  },
  pickerInverted: {
    translate: "50% 0",
  },
  pickerPosition: (value: number, inverted?: boolean) => ({
    insetInlineEnd: inverted ? `${value}%` : null,
    insetInlineStart: inverted ? null : `${value}%`,
  }),
  pickerScale: {
    scale: 1.25,
  },
  valueContainer: {
    insetBlock: 0,
    insetInlineEnd: null,
    insetInlineStart: 0,
    overflowX: null,
    overflowY: null,
    position: "absolute",
    width: null,
  },
  valueContainerClear: {
    opacity: 0,
  },
  valueContainerInverted: {
    insetInlineEnd: 0,
    insetInlineStart: null,
  },
  valueSize: (value: number) => ({
    width: `${value}%`,
  }),
});

const Slider = ({
  clear,
  defaultValue = 0,
  handleStyle,
  hidden,
  id,
  inverted,
  name,
  onChange,
  onImediateChange,
  step,
  style,
  valueStyle,
  variant,
}: SliderProps) => {
  const {
    currentId,
    currentPickerId,
    currentSliderId,
    grabbing,
    pickerRef,
    sliderRef,
    value,
  } = useSlider({
    defaultValue,
    id,
    inverted,
    onChange,
    onImediateChange,
    step,
  });

  return (
    <>
      <input
        id={currentId}
        name={name}
        type="hidden"
        value={value}
      />
      <View
        hidden={hidden}
        id={currentSliderId}
        ref={sliderRef}
        style={[
          roundedStyles.pill,
          backgroundStyles.default(100),
          variant && outlineInteractiveStyles.inverted(variant, 45),
          !variant && outlineInteractiveStyles.currentColor(65),
          insetShadowStyles.default,
          borderStyles.outline,
          borderStyles.outlineSize(2.5),
          borderStyles.outlineOffset(4),
          styles.container,
          grabbing && styles.grabbing,
          style,
        ]}
        tabIndex={0}
      >
        <View
          style={[
            roundedStyles.pill,
            insetShadowStyles.inverted,
            !variant && backgroundStyles.defaultInverted(100),
            styles.valueContainer,
            styles.nonInteractive,
            !clear && styles.valueSize(value),
            !clear && inverted && styles.valueContainerInverted,
            typeof clear === "boolean" && clear && styles.valueContainerClear,
            typeof clear === "string" && clear === "fill" && styles.valueSize(100),
            valueStyle,
          ]}
          variant={variant}
        />
        <View
          id={currentPickerId}
          ref={pickerRef}
          style={[
            roundedStyles.circle,
            textColorStyles.default,
            !variant && backgroundStyles.defaultInverted(100),
            insetAndElevationStyles.invertedDefault(1),
            styles.picker,
            grabbing && [
              styles.nonInteractive,
              styles.pickerScale,
            ],
            inverted && styles.pickerInverted,
            styles.pickerPosition(value, inverted),
            handleStyle,
          ]}
          variant={variant}
        />
      </View>
    </>
  );
};

export default Slider;
