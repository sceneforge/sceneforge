import * as stylex from "@stylexjs/stylex";
import { lazy, useMemo } from "react";

import { colorStyles } from "../../colors.stylex";
import { hslToRgb, rgbToHex } from "../../helpers";
import { useCurrentId } from "../../hooks";
import { insetShadowStyles } from "../../shadow.stylex";
import { Shape, Variant } from "../../types";
import { Grid } from "../Grid";
import { View } from "../View";

export type ColorConfigProps = {
  defaultHue?: number;
  defaultLightness?: number;
  defaultSaturation?: number;
  id?: string;
  onHueChange?: (hue: number) => void;
  onLightnessChange?: (lightness: number) => void;
  onSaturationChange?: (saturation: number) => void;
  variant?: Variant;
};

const styles = stylex.create({
  background: (hue: number, saturation: number, lightness: number) => ({
    backgroundColor: `hsl(${hue}deg ${saturation}% ${lightness}%)`,
  }),
  colorInfo: {
    fontSize: "0.825rem",
    fontWeight: "bold",
    width: "2.5rem",
  },
  colorInfoHexValue: {
    gridColumn: "2 / -1",
  },
  colorInfoValue: {
    fontFamily: "monospace",
    fontSize: "0.825rem",
    minWidth: "2.5rem",
  },
  colorView: {
    aspectRatio: 1,
    height: null,
    width: null,
  },
  info: {
    gridColumn: "1 / -1",
  },
  sliderValue: {
    fontSize: "0.75rem",
    overflow: "hidden",
    paddingInlineStart: "0.5rem",
    textOverflow: "ellipsis",
    userSelect: "none",
    width: "3.5rem",
  },
  sliders: {
    overflowX: null,
    overflowY: null,
  },
});

const HueSlider = lazy(() => import("./HueSlider"));
const SaturationSlider = lazy(() => import("./SaturationSlider"));
const LightnessSlider = lazy(() => import("./LightnessSlider"));

const ColorConfig = ({
  defaultHue = 0,
  defaultLightness = 50,
  defaultSaturation = 100,
  id,
  onHueChange,
  onLightnessChange,
  onSaturationChange,
  variant,
}: ColorConfigProps) => {
  const currentId = useCurrentId(id);

  const rgb = useMemo(() => {
    return hslToRgb(defaultHue, defaultSaturation, defaultLightness);
  }, [defaultHue, defaultSaturation, defaultLightness]);

  return (
    <Grid
      columns={2}
      columnsTrack="auto"
      gap={2}
      id={currentId}
      padding={0.5}
      style={[
        !variant && colorStyles.default,
      ]}
      variant={variant}
    >
      <View
        shape={Shape.Rounded}
        style={[
          styles.colorView,
          insetShadowStyles.default,
          styles.background(defaultHue, defaultSaturation, defaultLightness),
        ]}
      />
      <Grid
        columns={2}
        columnsTrack="auto"
        gap={2}
        style={styles.sliders}
      >
        <HueSlider
          defaultHue={defaultHue}
          id={`${currentId}-hue-slider`}
          onChange={onHueChange}
        />
        <span {...stylex.props(styles.sliderValue)}>
          {`H ${Math.round(defaultHue)}°`}
        </span>
        <SaturationSlider
          defaultSaturation={defaultSaturation}
          hue={defaultHue}
          id={`${currentId}-saturation-slider`}
          onChange={onSaturationChange}
        />
        <span {...stylex.props(styles.sliderValue)}>
          {`S ${Math.round(defaultSaturation)}%`}
        </span>
        <LightnessSlider
          defaultLightness={defaultLightness}
          hue={defaultHue}
          id={`${currentId}-lightness-slider`}
          onChange={onLightnessChange}
          saturation={defaultSaturation}
        />
        <span {...stylex.props(styles.sliderValue)}>
          {`L ${Math.round(defaultLightness)}%`}
        </span>
      </Grid>
      <View style={styles.info}>
        <Grid
          columns={4}
          columnsTrack="min-content"
        >
          <strong {...stylex.props(styles.colorInfo)}>RGB</strong>
          <span {...stylex.props(styles.colorInfoValue)}>{rgb.red}</span>
          <span {...stylex.props(styles.colorInfoValue)}>{rgb.green}</span>
          <span {...stylex.props(styles.colorInfoValue)}>{rgb.blue}</span>
          <strong {...stylex.props(styles.colorInfo)}>HEX</strong>
          <span
            {...stylex.props(
              styles.colorInfoValue,
              styles.colorInfoHexValue
            )}
          >
            {rgbToHex(rgb.red, rgb.green, rgb.blue)}
          </span>
        </Grid>
      </View>
    </Grid>
  );
};

export default ColorConfig;
