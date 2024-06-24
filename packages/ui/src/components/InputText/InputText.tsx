import type { AllHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { Variant } from "../../types";
import { color } from "../tokens.stylex";

export type InputTextProps = {
  ref?: Ref<HTMLInputElement>;
  variant?: Variant;
} & Omit<AllHTMLAttributes<HTMLInputElement>, "checked" | "defaultChecked" | "type">;

const styles = stylex.create({
  container: {
    ":focus": {
      boxShadow: "0 0.125rem 0.25rem 0.0125rem color-mix(in srgb, currentColor 75%, transparent)",
      outline: "none",
      paddingInline: "0.25rem",
    },
    "backgroundColor": color.background,
    "borderBlockEndColor": color.foreground,
    "borderBlockEndStyle": "solid",
    "borderBlockEndWidth": "0.125rem",
    "borderBlockStart": "none",
    "borderInline": "none",
    "borderStartEndRadius": "0.25rem",
    "borderStartStartRadius": "0.25rem",
    "paddingBlock": "0.25rem",
    "paddingInline": 0,
    "transitionDuration": "0.25s",
    "transitionProperty": "box-shadow padding",
    "width": "100%",
  },
  variantColor: (border: keyof typeof color) => ({
    borderBlockEndColor: color[border],
    color: color[border],
  }),
});

const InputText = ({ ref, variant, ...props }: InputTextProps) => {
  return (
    <input
      type="text"
      {...props}
      ref={ref}
      {...stylex.props(
        styles.container,
        variant === Variant.Accent && styles.variantColor("accent"),
        variant === Variant.Default && styles.variantColor("primary"),
        variant === Variant.Danger && styles.variantColor("danger"),
        variant === Variant.Info && styles.variantColor("info"),
        variant === Variant.Success && styles.variantColor("success"),
        variant === Variant.Warning && styles.variantColor("warning")
      )}
    />
  );
};

export default InputText;
