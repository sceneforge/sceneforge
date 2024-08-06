import * as stylex from "@stylexjs/stylex";
import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";

import type { ThemeType } from "../../schemas";

import { themeColors } from "../../colors.stylex";
import { getColorObject } from "../../helpers";
import { Variant } from "../../types";
import { type SetColorStateType, useColorState } from "./useColorState";

export type ThemeContextType = {
  setBodyBackground: Dispatch<SetStateAction<Variant>>;
  setColors: { [key in Variant]: SetColorStateType };
} & ThemeType;

export const ThemeContext = createContext<ThemeContextType>({
  colors: {
    [Variant.Accent]: getColorObject(),
    [Variant.Danger]: getColorObject(),
    [Variant.Info]: getColorObject(),
    [Variant.Primary]: getColorObject(),
    [Variant.Success]: getColorObject(),
    [Variant.Warning]: getColorObject(),
  },
  setBodyBackground: () => void 0,
  setColors: {
    [Variant.Accent]: () => void 0,
    [Variant.Danger]: () => void 0,
    [Variant.Info]: () => void 0,
    [Variant.Primary]: () => void 0,
    [Variant.Success]: () => void 0,
    [Variant.Warning]: () => void 0,
  },
});

export type ThemeProviderProps = PropsWithChildren<{
  bodyBackground?: ThemeContextType["bodyBackground"];
  colors?: ThemeContextType["colors"];
}>;

const ThemeProvider = ({
  bodyBackground = Variant.Primary,
  children,
  colors,
}: ThemeProviderProps) => {
  const [
    currentBodyBackground,
    setCurrentBodyBackground,
  ] = useState(bodyBackground);

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

  const handleMatchMediaChange = useCallback(() => {
    if (
      currentBodyBackground
      && globalThis instanceof Window
      && "document" in globalThis
      && "getComputedStyle" in globalThis
      && globalThis.document instanceof Document
      && "body" in globalThis.document
      && globalThis.document.body instanceof HTMLBodyElement
      && typeof globalThis.getComputedStyle === "function"
    ) {
      const computedStyle = globalThis.getComputedStyle(
        globalThis.document.body
      );

      const metaThemeColor = globalThis.document.querySelector("html > head > meta[name=\"theme-color\"]");

      if (computedStyle && metaThemeColor) {
        const parsedBackgroundColor = computedStyle.getPropertyValue(`--theme-color-background-${currentBodyBackground}`);

        if (parsedBackgroundColor) {
          globalThis
            .document.body.style.backgroundColor = parsedBackgroundColor;

          metaThemeColor.setAttribute("content", parsedBackgroundColor);
        }
      }
    }
  }, [currentBodyBackground]);

  useLayoutEffect(() => {
    if (
      currentBodyBackground
      && "matchMedia" in globalThis
      && typeof globalThis.matchMedia === "function"
    ) {
      handleMatchMediaChange();
      globalThis.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleMatchMediaChange);

      return () => {
        globalThis.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleMatchMediaChange);
      };
    }
  }, [currentBodyBackground, handleMatchMediaChange]);

  return (
    <ThemeContext.Provider value={{
      bodyBackground: currentBodyBackground,
      colors: {
        [Variant.Accent]: colorAccent,
        [Variant.Danger]: colorDanger,
        [Variant.Info]: colorInfo,
        [Variant.Primary]: colorPrimary,
        [Variant.Success]: colorSuccess,
        [Variant.Warning]: colorWarning,
      },
      setBodyBackground: setCurrentBodyBackground,
      setColors: {
        [Variant.Accent]: setColorAccent,
        [Variant.Danger]: setColorDanger,
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
