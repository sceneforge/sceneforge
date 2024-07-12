import { useCallback, useMemo, useState } from "react";

import type { ThemeColorPlacementType, ThemeColorType } from "../../schemas";

import { getColorObject } from "../../helpers";

export type SetColorStateType = (
  value?: (
    (previous: ThemeColorPlacementType) => ThemeColorPlacementType
  ) | (ThemeColorPlacementType | ThemeColorType | string)
) => void;

export type ColorStateType = [
  ThemeColorPlacementType,
  SetColorStateType,
];

export const useColorState = (
  value?: ThemeColorPlacementType | ThemeColorType | string
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

  const color = useMemo((): ThemeColorPlacementType => ({
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

  const updateColor = useCallback((
    value?: ThemeColorPlacementType | ThemeColorType | string
  ) => {
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
