import { useContext } from "react";

import { Variant } from "../../types";
import { ThemeContext } from "./ThemeProvider";

export const useTheme = () => {
  const {
    bodyBackground,
    colors,
    setBodyBackground,
    setColors: {
      [Variant.Accent]: setColorAccent,
      [Variant.Danger]: setColorDanger,
      [Variant.Info]: setColorInfo,
      [Variant.Primary]: setColorPrimary,
      [Variant.Success]: setColorSuccess,
      [Variant.Warning]: setColorWarning,
    },
  } = useContext(ThemeContext);

  const {
    [Variant.Accent]: colorAccent,
    [Variant.Danger]: colorDanger,
    [Variant.Info]: colorInfo,
    [Variant.Primary]: colorPrimary,
    [Variant.Success]: colorSuccess,
    [Variant.Warning]: colorWarning,
  } = colors ?? {};

  return {
    bodyBackground,
    colorAccent,
    colorDanger,
    colorInfo,
    colorPrimary,
    colorSuccess,
    colorWarning,
    setBodyBackground,
    setColorAccent,
    setColorDanger,
    setColorInfo,
    setColorPrimary,
    setColorSuccess,
    setColorWarning,
  };
};
