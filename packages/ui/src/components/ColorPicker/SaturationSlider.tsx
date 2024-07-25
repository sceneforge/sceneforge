import * as stylex from "@stylexjs/stylex";
import { useCallback, useState } from "react";

import { Slider } from "../Slider";

export type SaturationSliderProps = {
  defaultSaturation?: number;
  hue?: number;
  id?: string;
  onChange?: (hslDeg: number) => void;
};

const styles = stylex.create({
  container: (hue: number) => ({
    backgroundImage: `linear-gradient(90deg in hsl, ${[
      `hsl(${hue}deg 0% 50%)`,
      `hsl(${hue}deg 100% 50%)`,
    ].join(", ")})`,
  }),
  handle: (hue: number, saturation: number) => ({
    backgroundColor: `hsl(${hue}deg ${saturation}% 50%)`,
  }),
});

const SaturationSlider = ({
  defaultSaturation = 100,
  hue = 0,
  id,
  onChange,
}: SaturationSliderProps) => {
  const [saturation, setSaturation] = useState<number>(defaultSaturation);

  const setSaturationFromPercent = useCallback((percent: number) => {
    setSaturation(percent);
    if (onChange) onChange(percent);
  }, [onChange]);

  return (
    <Slider
      clear
      defaultValue={defaultSaturation}
      handleStyle={styles.handle(hue, saturation)}
      id={id}
      onImediateChange={setSaturationFromPercent}
      step={1}
      style={styles.container(hue)}
    />
  );
};

export default SaturationSlider;
