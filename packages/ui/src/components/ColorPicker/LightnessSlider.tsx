import * as stylex from "@stylexjs/stylex";
import { useCallback, useState } from "react";

import { Slider } from "../Slider";

export type LightnessSliderProps = {
  defaultLightness?: number;
  hue?: number;
  id?: string;
  onChange?: (hslDeg: number) => void;
  saturation?: number;
};

const styles = stylex.create({
  container: (hue: number, saturation: number) => ({
    backgroundImage: `linear-gradient(90deg in hsl, ${[
      `hsl(${hue}deg ${saturation} 0%)`,
      `hsl(${hue}deg ${saturation} 50%)`,
      `hsl(${hue}deg ${saturation}% 100%)`,
    ].join(", ")})`,
  }),
  handle: (hue: number, saturation: number, lightness: number) => ({
    backgroundColor: `hsl(${hue}deg ${saturation}% ${lightness}%)`,
  }),
});

const LightnessSlider = ({
  defaultLightness = 50,
  hue = 0,
  id,
  onChange,
  saturation = 100,
}: LightnessSliderProps) => {
  const [lightness, setLightness] = useState<number>(defaultLightness);

  const setLightnessFromPercent = useCallback((percent: number) => {
    setLightness(percent);
    if (onChange) onChange(percent);
  }, [onChange]);

  return (
    <Slider
      clear
      defaultValue={defaultLightness}
      handleStyle={styles.handle(hue, saturation, lightness)}
      id={id}
      onImediateChange={setLightnessFromPercent}
      step={1}
      style={styles.container(hue, saturation)}
    />
  );
};

export default LightnessSlider;
