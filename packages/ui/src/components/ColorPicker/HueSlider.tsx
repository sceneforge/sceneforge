import * as stylex from "@stylexjs/stylex";
import { useCallback, useState } from "react";

import { Slider } from "../Slider";

export type HueSliderProps = {
  defaultHue?: number;
  id?: string;
  onChange?: (hslDeg: number) => void;
};

const styles = stylex.create({
  container: {
    backgroundImage: `linear-gradient(90deg in hsl longer hue, ${[
      "hsl(1deg 100% 50%)",
      "hsl(-1deg 100% 50%)",
    ].join(", ")})`,
  },
  handle: (hue: number) => ({
    backgroundColor: `hsl(${hue}deg 100% 50%)`,
  }),
});

const HueSlider = ({
  defaultHue = 0,
  id,
  onChange,
}: HueSliderProps) => {
  const [hue, setHue] = useState<number>(defaultHue);

  const setHueFromPercent = useCallback((percent: number) => {
    setHue((percent / 100) * 360);
    if (onChange) onChange((percent / 100) * 360);
  }, [onChange]);

  return (
    <Slider
      clear
      defaultValue={(defaultHue / 360) * 100}
      handleStyle={styles.handle(hue)}
      id={id}
      onImediateChange={setHueFromPercent}
      step={0.01}
      style={styles.container}
    />
  );
};

export default HueSlider;
