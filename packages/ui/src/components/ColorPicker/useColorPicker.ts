import { useMemo, useState } from "react";

import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from "../../helpers";
import { useCurrentId } from "../../hooks";

export type UseColorPickerProps = {
  defaultValue?: string;
  id?: string;
};

export const useColorPicker = ({
  defaultValue,
  id,
}: UseColorPickerProps) => {
  const currentId = useCurrentId(id);
  const currentInputId = useMemo(() => `${currentId}-input`, [currentId]);
  const currentViewId = useMemo(() => `${currentId}-view`, [currentId]);

  const {
    hue: defaultHue,
    lightness: defaultLightness,
    saturation: defaultSaturation,
  } = useMemo(() => {
    const { blue, green, red } = hexToRgb(defaultValue ?? "#FF0000");
    return rgbToHsl(red, green, blue);
  }, [defaultValue]);

  const [
    hue,
    setSetHue,
  ] = useState<number>(defaultHue ?? 0);
  const [
    saturation,
    setSaturation,
  ] = useState<number>(defaultSaturation ?? 100);
  const [
    lightness,
    setLightness,
  ] = useState<number>(defaultLightness ?? 50);

  const value = useMemo(() => {
    const { blue, green, red } = hslToRgb(hue, saturation, lightness);
    return rgbToHex(red, green, blue);
  }, [hue, lightness, saturation]);

  return {
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
  };
};
