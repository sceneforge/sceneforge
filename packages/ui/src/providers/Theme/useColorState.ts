import { useCallback, useMemo, useState } from "react";

import type { ColorPlacementType, ColorValueType } from "../../types";

import { getColorObject } from "../../helpers";

export type SetColorStateType = (
  value?: ((previous: ColorPlacementType) => ColorValueType) | (ColorValueType)
) => void;

export type ColorStateType = [
  ColorPlacementType,
  SetColorStateType,
];

export const useColorState = (
  value?: ColorValueType
): ColorStateType => {
  const [
    colorBackgroundDark,
    setColorBackgroundDark,
  ] = useState<string | undefined>(getColorObject(value)?.background?.dark);
  const [
    colorBackgroundLight,
    setColorBackgroundLight,
  ] = useState<string | undefined>(getColorObject(value)?.background?.light);
  const [
    colorForegroundDark,
    setColorForegroundDark,
  ] = useState<string | undefined>(getColorObject(value)?.foreground?.dark);
  const [
    colorForegroundLight,
    setColorForegroundLight,
  ] = useState<string | undefined>(getColorObject(value)?.foreground?.light);

  const color = useMemo(() => ({
    background: {
      dark: colorBackgroundDark,
      light: colorBackgroundLight,
    },
    foreground: {
      dark: colorForegroundDark,
      light: colorForegroundLight,
    },
  }), [
    colorBackgroundDark,
    colorBackgroundLight,
    colorForegroundDark,
    colorForegroundLight,
  ]);

  const updateColor = useCallback((value?: ColorValueType) => {
    const colorObject = getColorObject(value);
    setColorBackgroundDark(colorObject?.background?.dark);
    setColorBackgroundLight(colorObject?.background?.light);
    setColorForegroundDark(colorObject?.foreground?.dark);
    setColorForegroundLight(colorObject?.foreground?.light);
  }, []);

  const setColor: SetColorStateType = useCallback((value) => {
    if (typeof value === "function") {
      updateColor(value(color));
    }
    else {
      updateColor(value);
    }
  }, [color, updateColor]);

  return [
    color,
    setColor,
  ];
};
