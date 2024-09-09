import type { InputHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { borderStyles, roundedStyles } from "../../borders.stylex";
import { backgroundStyles, colorVariables } from "../../colors.stylex";
import { Variant, type VariantType } from "../../types";

export type SwitchProps = {
  ref?: Ref<HTMLInputElement | null>;
  variant?: Variant;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "style" | "type">;

const styles = stylex.create({
  colorVariant: (variant: VariantType) => ({
    "::before": {
      borderColor: colorVariables[`--theme-color-foreground-${variant}`],
    },
    ":has(input:checked)::before": {
      backgroundColor: colorVariables[`--theme-color-foreground-${variant}`],
    },
    ":has(input:not(:checked))::before": {
      backgroundColor: colorVariables[`--theme-color-background-${variant}`],
    },
    "backgroundColor": {
      ":has(input:checked)": colorVariables[`--theme-color-background-${variant}`],
      "default": colorVariables[`--theme-color-foreground-${variant}`],
    },
    "color": {
      ":has(input:checked)": colorVariables[`--theme-color-background-${variant}`],
      "default": colorVariables[`--theme-color-foreground-${variant}`],
    },
  }),
  container: {
    "::before": {
      borderColor: "transparent",
      borderRadius: "100vw",
      borderStyle: "solid",
      borderWidth: "0.125rem",
      content: "''",
      inset: 0,
      margin: "5%",
      pointerEvents: "none",
      position: "absolute",
      touchAction: "none",
      transition: "transform 0.125s, background-color 0.125s",
      width: "55%",
    },
    ":has(input:checked)": {
      backgroundColor: "AccentColor",
    },
    ":has(input:checked)::before": {
      backgroundColor: "Canvas",
      transform: "translateX(60%)",
    },
    ":has(input:disabled)": {
      cursor: "default",
      opacity: 0.5,
    },
    ":has(input:focus)": {
      boxShadow: "0 0 0.125rem 0.125rem color-mix(in srgb, currentColor 75%, transparent)",
    },
    ":has(input:not(:checked))::before": {
      backgroundColor: "currentColor",
    },
    "box-sizing": "border-box",
    "cursor": "pointer",
    "display": "inline-block",
    "overflow": "clip",
    "position": "relative",
    "transition": "background-color 0.125s, border-color 0.125s",
    "width": "2.5rem",
  },
  input: {
    cursor: "inherit",
    height: "100%",
    margin: 0,
    opacity: 0,
    padding: 0,
    pointerEvents: "auto",
    touchAction: "auto",
    width: "100%",
  },
});

const Switch = ({
  ref,
  variant,
  ...props
}: SwitchProps) => {
  return (
    <span
      tabIndex={-1}
      {...stylex.props(
        styles.container,
        backgroundStyles.default(50),
        roundedStyles.pill,
        borderStyles.border,
        borderStyles.borderSize(1),
        borderStyles.borderCurrentColor(25),
        variant && styles.colorVariant(variant)
      )}
    >
      <input
        {...props}
        ref={ref}
        role="switch"
        type="checkbox"
        {...stylex.props(styles.input)}
      />
    </span>
  );
};

export default Switch;
