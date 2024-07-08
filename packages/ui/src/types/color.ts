export type ColorSchemeType = {
  dark?: string;
  light?: string;
};

export type ColorPlacementType = {
  background?: ColorSchemeType;
  foreground?: ColorSchemeType;
};

export type ColorPlacementValueType = {
  background?: ColorSchemeType | string;
  foreground?: ColorSchemeType | string;
};

export type ColorValueType = ColorPlacementValueType | ColorSchemeType | string;
