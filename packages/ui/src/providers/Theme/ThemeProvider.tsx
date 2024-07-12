import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren, createContext } from "react";

import type { ThemeType } from "../../schemas";

import { themeColors } from "../../colors.stylex";
import { getColorObject } from "../../helpers";
import { Variant } from "../../types";
import { type SetColorStateType, useColorState } from "./useColorState";

export type ThemeContextType = {
  setColors: { [key in Variant]: SetColorStateType };
} & ThemeType;

export const ThemeContext = createContext<ThemeContextType>({
  colors: {
    [Variant.Accent]: getColorObject(),
    [Variant.Danger]: getColorObject(),
    [Variant.Default]: getColorObject(),
    [Variant.Info]: getColorObject(),
    [Variant.Primary]: getColorObject(),
    [Variant.Success]: getColorObject(),
    [Variant.Warning]: getColorObject(),
  },
  setColors: {
    [Variant.Accent]: () => void 0,
    [Variant.Danger]: () => void 0,
    [Variant.Default]: () => void 0,
    [Variant.Info]: () => void 0,
    [Variant.Primary]: () => void 0,
    [Variant.Success]: () => void 0,
    [Variant.Warning]: () => void 0,
  },
});

export type ThemeProviderProps = PropsWithChildren<{
  colors?: ThemeContextType["colors"];
}>;

const ThemeProvider = ({ children, colors }: ThemeProviderProps) => {
  const [colorAccent, setColorAccent] = useColorState(
    colors?.[Variant.Accent] ?? {
      background: {
        dark: "#006e50",
        light: "#00a98f",
      },
      foreground: {
        dark: "#ffffff",
        light: "#ffffff",
      },
    }
  );

  const [colorDanger, setColorDanger] = useColorState(
    colors?.[Variant.Danger] ?? {
      background: {
        dark: "#cc2244",
        light: "#aa2244",
      },
      foreground: {
        dark: "#ffffff",
        light: "#ffffff",
      },
    }
  );

  const [colorDefault, setColorDefault] = useColorState(
    colors?.[Variant.Default] ?? {
      background: {
        dark: "#000000",
        light: "#ffffff",
      },
      foreground: {
        dark: "#ffffff",
        light: "#000000",
      },
    }
  );

  const [colorInfo, setColorInfo] = useColorState(
    colors?.[Variant.Info] ?? {
      background: {
        dark: "#0044cc",
        light: "#0066cc",
      },
      foreground: {
        dark: "#ffffff",
        light: "#ffffff",
      },
    }
  );

  const [colorPrimary, setColorPrimary] = useColorState(
    colors?.[Variant.Primary] ?? {
      background: {
        dark: "#75048c",
        light: "#86159d",
      },
      foreground: {
        dark: "#ffffff",
        light: "#ffffff",
      },
    }
  );

  const [colorSuccess, setColorSuccess] = useColorState(
    colors?.[Variant.Success] ?? {
      background: {
        dark: "#007f00",
        light: "#009f00",
      },
      foreground: {
        dark: "#ffffff",
        light: "#ffffff",
      },
    }
  );

  const [colorWarning, setColorWarning] = useColorState(
    colors?.[Variant.Warning] ?? {
      background: {
        dark: "#ff8c00",
        light: "#ff9f00",
      },
      foreground: {
        dark: "#000000",
        light: "#000000",
      },
    }
  );

  return (
    <ThemeContext.Provider value={{
      colors: {
        [Variant.Accent]: colorAccent,
        [Variant.Danger]: colorDanger,
        [Variant.Default]: colorDefault,
        [Variant.Info]: colorInfo,
        [Variant.Primary]: colorPrimary,
        [Variant.Success]: colorSuccess,
        [Variant.Warning]: colorWarning,
      },
      setColors: {
        [Variant.Accent]: setColorAccent,
        [Variant.Danger]: setColorDanger,
        [Variant.Default]: setColorDefault,
        [Variant.Info]: setColorInfo,
        [Variant.Primary]: setColorPrimary,
        [Variant.Success]: setColorSuccess,
        [Variant.Warning]: setColorWarning,
      },
    }}
    >
      <div
        {...stylex.props(
          themeColors.setColorAccent(colorAccent),
          themeColors.setColorDanger(colorDanger),
          themeColors.setColorDefault(colorDefault),
          themeColors.setColorInfo(colorInfo),
          themeColors.setColorPrimary(colorPrimary),
          themeColors.setColorSuccess(colorSuccess),
          themeColors.setColorWarning(colorWarning)
        )}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
