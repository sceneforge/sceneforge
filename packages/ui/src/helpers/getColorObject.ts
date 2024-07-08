import type { ColorPlacementType, ColorSchemeType, ColorValueType } from "../types";

const colorScheme = (value?: ColorSchemeType | string) => {
  let result: ColorSchemeType = {
    dark: undefined,
    light: undefined,
  };

  if (typeof value === "object") {
    if ("dark" in value) {
      result = {
        ...result,
        dark: value.dark,
      };
    }

    if ("light" in value) {
      result = {
        ...result,
        light: value.light,
      };
    }
  }
  else if (typeof value === "string") {
    result = {
      dark: value,
      light: value,
    };
  }

  return result;
};

const colorPlacement = (value?: ColorSchemeType | string) => ({
  background: colorScheme(value),
  foreground: colorScheme(value),
});

export const getColorObject = (value?: ColorValueType): ColorPlacementType => {
  if (typeof value === "string") {
    return colorPlacement(value);
  }

  let result = colorPlacement();

  if (typeof value === "object") {
    if ("background" in value) {
      result = {
        ...result,
        background: colorScheme(value.background),
      };
    }

    if ("foreground" in value) {
      result = {
        ...result,
        foreground: colorScheme(value.foreground),
      };
    }
  }

  return result;
};
