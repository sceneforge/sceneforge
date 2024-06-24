import type { PropsWithChildren } from "react";

import * as stylex from "@stylexjs/stylex";

import { Variant } from "../../types";
import { backgroundColor, color } from "../tokens.stylex";

export type FieldsetProps = PropsWithChildren<{
  legend?: string;
  variant?: Variant;
}>;

const styles = stylex.create({
  container: {
    backgroundColor: color.background,
    border: 0,
    color: color.foreground,
    margin: 0,
    padding: 0,
  },
  legend: {
    backgroundColor: backgroundColor.alpha50,
    display: "block",
    margin: 0,
    outline: "solid 1px red",
    padding: 0,
    position: "relative",
    width: "100%",
  },
  variantColor: (background: keyof typeof color, text: keyof typeof color) => ({
    backgroundColor: color[background],
    color: color[text],
  }),
});

const Fieldset = ({ children, legend, variant }: FieldsetProps) => {
  return (
    <fieldset
      {...stylex.props(
        styles.container,
        variant === Variant.Accent && styles.variantColor("accent", "accentText"),
        variant === Variant.Default && styles.variantColor("primary", "primaryText"),
        variant === Variant.Danger && styles.variantColor("danger", "dangerText"),
        variant === Variant.Info && styles.variantColor("info", "infoText"),
        variant === Variant.Success && styles.variantColor("success", "successText"),
        variant === Variant.Warning && styles.variantColor("warning", "warningText")
      )}
    >
      {legend && <legend>{legend}</legend>}
      {children}
    </fieldset>
  );
};

export default Fieldset;
