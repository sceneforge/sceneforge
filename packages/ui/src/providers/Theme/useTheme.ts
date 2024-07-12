import { useContext } from "react";

import { Variant } from "../../types";
import { ThemeContext } from "./ThemeProvider";

export const useTheme = () => {
  const {
    colors,
    setColors: {
      [Variant.Accent]: setColorAccent,
      [Variant.Danger]: setColorDanger,
      [Variant.Default]: setColorDefault,
      [Variant.Info]: setColorInfo,
      [Variant.Primary]: setColorPrimary,
      [Variant.Success]: setColorSuccess,
      [Variant.Warning]: setColorWarning,
    },
  } = useContext(ThemeContext);

  const {
    [Variant.Accent]: colorAccent,
    [Variant.Danger]: colorDanger,
    [Variant.Default]: colorDefault,
    [Variant.Info]: colorInfo,
    [Variant.Primary]: colorPrimary,
    [Variant.Success]: colorSuccess,
    [Variant.Warning]: colorWarning,
  } = colors ?? {};

  return {
    colorAccent,
    colorDanger,
    colorDefault,
    colorInfo,
    colorPrimary,
    colorSuccess,
    colorWarning,
    setColorAccent,
    setColorDanger,
    setColorDefault,
    setColorInfo,
    setColorPrimary,
    setColorSuccess,
    setColorWarning,
  };
};
