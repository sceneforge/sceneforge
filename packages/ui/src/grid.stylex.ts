import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";

import { type FromMediaValue2Arg, type FromMediaValueArg, fromMedia } from "./helpers";

export const gridStyles = stylex.create({
  autoColumns: (size: number) => ({
    gridAutoColumns: `${size}rem`,
  }),
  autoColumnsFromLg: (
    lg: number,
    xl?: number,
    xxl?: number
  ) => ({
    gridAutoColumns: {
      "@media only screen and (min-width: 1200px)": xl ? `${xl}rem` : null,
      "@media only screen and (min-width: 1400px)": xxl ? `${xxl}rem` : null,
      "default": `${lg}rem`,
    },
  }),
  autoColumnsFromMd: (
    md: number,
    lg?: number,
    xl?: number,
    xxl?: number
  ) => ({
    gridAutoColumns: {
      "@media only screen and (min-width: 992px)": lg ? `${lg}rem` : null,
      "@media only screen and (min-width: 1200px)": xl ? `${xl}rem` : null,
      "@media only screen and (min-width: 1400px)": xxl ? `${xxl}rem` : null,
      "default": `${md}rem`,
    },
  }),
  autoColumnsFromSm: (
    sm: number,
    md?: number,
    lg?: number,
    xl?: number,
    xxl?: number
  ) => ({
    gridAutoColumns: {
      "@media only screen and (min-width: 768px)": md ? `${md}rem` : null,
      "@media only screen and (min-width: 992px)": lg ? `${lg}rem` : null,
      "@media only screen and (min-width: 1200px)": xl ? `${xl}rem` : null,
      "@media only screen and (min-width: 1400px)": xxl ? `${xxl}rem` : null,
      "default": `${sm}rem`,
    },
  }),
  autoColumnsFromXl: (
    xl: number,
    xxl?: number
  ) => ({
    gridAutoColumns: {
      "@media only screen and (min-width: 1400px)": xxl ? `${xxl}rem` : null,
      "default": `${xl}rem`,
    },
  }),
  autoRows: (size: number) => ({
    gridAutoRows: `${size}rem`,
  }),
  autoRowsFromLg: (
    lg: number,
    xl?: number,
    xxl?: number
  ) => ({
    gridAutoRows: {
      "@media only screen and (min-width: 1200px)": xl ? `${xl}rem` : null,
      "@media only screen and (min-width: 1400px)": xxl ? `${xxl}rem` : null,
      "default": `${lg}rem`,
    },
  }),
  autoRowsFromMd: (
    md: number,
    lg?: number,
    xl?: number,
    xxl?: number
  ) => ({
    gridAutoRows: {
      "@media only screen and (min-width: 992px)": lg ? `${lg}rem` : null,
      "@media only screen and (min-width: 1200px)": xl ? `${xl}rem` : null,
      "@media only screen and (min-width: 1400px)": xxl ? `${xxl}rem` : null,
      "default": `${md}rem`,
    },
  }),
  autoRowsFromSm: (
    sm: number,
    md?: number,
    lg?: number,
    xl?: number,
    xxl?: number
  ) => ({
    gridAutoRows: {
      "@media only screen and (min-width: 768px)": md ? `${md}rem` : null,
      "@media only screen and (min-width: 992px)": lg ? `${lg}rem` : null,
      "@media only screen and (min-width: 1200px)": xl ? `${xl}rem` : null,
      "@media only screen and (min-width: 1400px)": xxl ? `${xxl}rem` : null,
      "default": `${sm}rem`,
    },
  }),
  autoRowsFromXl: (
    xl: number,
    xxl?: number
  ) => ({
    gridAutoRows: {
      "@media only screen and (min-width: 1400px)": xxl ? `${xxl}rem` : null,
      "default": `${xl}rem`,
    },
  }),
  gap: (size: number) => ({
    gap: `${size * 0.25}rem`,
  }),
  gapFromLg: (
    lg: number,
    xl?: number,
    xxl?: number
  ) => ({
    gap: {
      "@media only screen and (min-width: 1200px)": xl ? `${xl * 0.25}rem` : null,
      "@media only screen and (min-width: 1400px)": xxl ? `${xxl * 0.25}rem` : null,
      "default": `${lg * 0.25}rem`,
    },
  }),
  gapFromMd: (
    md: number,
    lg?: number,
    xl?: number,
    xxl?: number
  ) => ({
    gap: {
      "@media only screen and (min-width: 992px)": lg ? `${lg * 0.25}rem` : null,
      "@media only screen and (min-width: 1200px)": xl ? `${xl * 0.25}rem` : null,
      "@media only screen and (min-width: 1400px)": xxl ? `${xxl * 0.25}rem` : null,
      "default": `${md * 0.25}rem`,
    },
  }),
  gapFromSm: (
    sm: number,
    md?: number,
    lg?: number,
    xl?: number,
    xxl?: number
  ) => ({
    gap: {
      "@media only screen and (min-width: 768px)": md ? `${md * 0.25}rem` : null,
      "@media only screen and (min-width: 992px)": lg ? `${lg * 0.25}rem` : null,
      "@media only screen and (min-width: 1200px)": xl ? `${xl * 0.25}rem` : null,
      "@media only screen and (min-width: 1400px)": xxl ? `${xxl * 0.25}rem` : null,
      "default": `${sm * 0.25}rem`,
    },
  }),
  gapFromXl: (
    xl: number,
    xxl?: number
  ) => ({
    gap: {
      "@media only screen and (min-width: 1400px)": xxl ? `${xxl * 0.25}rem` : null,
      "default": `${xl * 0.25}rem`,
    },
  }),
  grid: {
    display: "grid",
  },
  onlyColumns: {
    gridAutoFlow: "column",
  },
  onlyRows: {
    gridAutoFlow: "row",
  },
  templateColumnsRepeat: (cols: number, track?: string) => ({
    gridTemplateColumns: `repeat(${cols}, ${track ?? "1fr"})`,
  }),
  templateColumnsRepeatFromLg: (
    lgCols: number,
    lgTrack?: string,
    xlCols?: number,
    xlTrack?: string,
    xxlCols?: number,
    xxlTrack?: string
  ) => ({
    gridTemplateColumns: {
      "@media only screen and (min-width: 1200px)": xlCols ? `repeat(${xlCols}, ${xlTrack ?? "1fr"})` : null,
      "@media only screen and (min-width: 1400px)": xxlCols ? `repeat(${xxlCols}, ${xxlTrack ?? "1fr"})` : null,
      "default": `repeat(${lgCols}, ${lgTrack ?? "1fr"})`,
    },
  }),
  templateColumnsRepeatFromMd: (
    mdCols: number,
    mdTrack?: string,
    lgCols?: number,
    lgTrack?: string,
    xlCols?: number,
    xlTrack?: string,
    xxlCols?: number,
    xxlTrack?: string
  ) => ({
    gridTemplateColumns: {
      "@media only screen and (min-width: 992px)": lgCols ? `repeat(${lgCols}, ${lgTrack ?? "1fr"})` : null,
      "@media only screen and (min-width: 1200px)": xlCols ? `repeat(${xlCols}, ${xlTrack ?? "1fr"})` : null,
      "@media only screen and (min-width: 1400px)": xxlCols ? `repeat(${xxlCols}, ${xxlTrack ?? "1fr"})` : null,
      "default": `repeat(${mdCols}, ${mdTrack ?? "1fr"})`,
    },
  }),
  templateColumnsRepeatFromSm: (
    smCols: number,
    smTrack?: string,
    mdCols?: number,
    mdTrack?: string,
    lgCols?: number,
    lgTrack?: string,
    xlCols?: number,
    xlTrack?: string,
    xxlCols?: number,
    xxlTrack?: string
  ) => ({
    gridTemplateColumns: {
      "@media only screen and (min-width: 768px)": mdCols ? `repeat(${mdCols}, ${mdTrack ?? "1fr"})` : null,
      "@media only screen and (min-width: 992px)": lgCols ? `repeat(${lgCols}, ${lgTrack ?? "1fr"})` : null,
      "@media only screen and (min-width: 1200px)": xlCols ? `repeat(${xlCols}, ${xlTrack ?? "1fr"})` : null,
      "@media only screen and (min-width: 1400px)": xxlCols ? `repeat(${xxlCols}, ${xxlTrack ?? "1fr"})` : null,
      "default": `repeat(${smCols}, ${smTrack ?? "1fr"})`,
    },
  }),
  templateColumnsRepeatFromXl: (
    xlCols: number,
    xlTrack?: string,
    xxlCols?: number,
    xxlTrack?: string
  ) => ({
    gridTemplateColumns: {
      "@media only screen and (min-width: 1400px)": xxlCols ? `repeat(${xxlCols}, ${xxlTrack ?? "1fr"})` : null,
      "default": `repeat(${xlCols}, ${xlTrack ?? "1fr"})`,
    },
  }),
  templateRowsRepeat: (rows: number, track?: string) => ({
    gridTemplateRows: `repeat(${rows}, ${track ?? "1fr"})`,
  }),
  templateRowsRepeatFromLg: (
    lgRows: number,
    lgTrack?: string,
    xlRows?: number,
    xlTrack?: string,
    xxlRows?: number,
    xxlTrack?: string
  ) => ({
    gridTemplateRows: {
      "@media only screen and (min-width: 1200px)": xlRows ? `repeat(${xlRows}, ${xlTrack ?? "1fr"})` : null,
      "@media only screen and (min-width: 1400px)": xxlRows ? `repeat(${xxlRows}, ${xxlTrack ?? "1fr"})` : null,
      "default": `repeat(${lgRows}, ${lgTrack ?? "1fr"})`,
    },
  }),
  templateRowsRepeatFromMd: (
    mdRows: number,
    mdTrack?: string,
    lgRows?: number,
    lgTrack?: string,
    xlRows?: number,
    xlTrack?: string,
    xxlRows?: number,
    xxlTrack?: string
  ) => ({
    gridTemplateRows: {
      "@media only screen and (min-width: 992px)": lgRows ? `repeat(${lgRows}, ${lgTrack ?? "1fr"})` : null,
      "@media only screen and (min-width: 1200px)": xlRows ? `repeat(${xlRows}, ${xlTrack ?? "1fr"})` : null,
      "@media only screen and (min-width: 1400px)": xxlRows ? `repeat(${xxlRows}, ${xxlTrack ?? "1fr"})` : null,
      "default": `repeat(${mdRows}, ${mdTrack ?? "1fr"})`,
    },
  }),
  templateRowsRepeatFromSm: (
    smRows: number,
    smTrack?: string,
    mdRows?: number,
    mdTrack?: string,
    lgRows?: number,
    lgTrack?: string,
    xlRows?: number,
    xlTrack?: string,
    xxlRows?: number,
    xxlTrack?: string
  ) => ({
    gridTemplateRows: {
      "@media only screen and (min-width: 768px)": mdRows ? `repeat(${mdRows}, ${mdTrack ?? "1fr"})` : null,
      "@media only screen and (min-width: 992px)": lgRows ? `repeat(${lgRows}, ${lgTrack ?? "1fr"})` : null,
      "@media only screen and (min-width: 1200px)": xlRows ? `repeat(${xlRows}, ${xlTrack ?? "1fr"})` : null,
      "@media only screen and (min-width: 1400px)": xxlRows ? `repeat(${xxlRows}, ${xxlTrack ?? "1fr"})` : null,
      "default": `repeat(${smRows}, ${smTrack ?? "1fr"})`,
    },
  }),
  templateRowsRepeatFromXl: (
    xlRows: number,
    xlTrack?: string,
    xxlRows?: number,
    xxlTrack?: string
  ) => ({
    gridTemplateRows: {
      "@media only screen and (min-width: 1400px)": xxlRows ? `repeat(${xxlRows}, ${xxlTrack ?? "1fr"})` : null,
      "default": `repeat(${xlRows}, ${xlTrack ?? "1fr"})`,
    },
  }),
});

export type GridStyleHelperProps = {
  autoCols?: FromMediaValueArg<number>;
  autoRows?: FromMediaValueArg<number>;
  cols?: FromMediaValue2Arg<number, string | undefined>;
  gap?: FromMediaValueArg<number>;
  rows?: FromMediaValue2Arg<number, string | undefined>;
};

export const gridStyleHelper = ({
  autoCols,
  autoRows,
  cols,
  gap,
  rows,
}: GridStyleHelperProps) => {
  return [
    gridStyles.grid,
    cols && fromMedia(gridStyles, "templateColumnsRepeat", cols),
    gap && fromMedia(gridStyles, "gap", gap),
    rows && fromMedia(gridStyles, "templateRowsRepeat", rows),
    autoRows && fromMedia(gridStyles, "autoRows", autoRows),
    autoCols && fromMedia(gridStyles, "autoColumns", autoCols),
  ] as StyleXStyles;
};
