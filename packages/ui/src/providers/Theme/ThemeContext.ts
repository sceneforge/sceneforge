import { createContext, type Dispatch, type SetStateAction } from "react";

import type { ThemeType } from "../../schemas";
import type { SetColorStateType } from "./useColorState";

import { getColorObject } from "../../helpers";
import { Variant } from "../../types";

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
