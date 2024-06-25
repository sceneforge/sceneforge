import * as stylex from "@stylexjs/stylex";
import { type InputHTMLAttributes, type Ref } from "react";

import { Variant } from "../../types";
import { backgroundColor, color } from "../tokens.stylex";

export type SwitchProps = {
  ref?: Ref<HTMLInputElement | null>;
  variant?: Variant;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "style" | "type">;

const styles = stylex.create({
  colorVariant: (
    background: keyof typeof color,
    foreground: keyof typeof color
  ) => ({
    ":has(input:checked)": {
      backgroundColor: color[background],
      color: color[foreground],
    },
  }),
  container: {
    "::before": {
      borderRadius: "100vw",
      content: "''",
      inset: 0,
      margin: "5%",
      pointerEvents: "none",
      position: "absolute",
      touchAction: "none",
      transition: "transform 0.125s",
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
    "backgroundColor": backgroundColor.alpha50,
    "borderColor": backgroundColor.alpha75,
    "borderRadius": "100vw",
    "borderStyle": "solid",
    "borderWidth": "1px",
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
        variant === Variant.Accent && styles.colorVariant("accent", "accentText"),
        variant === Variant.Default && styles.colorVariant("primary", "primaryText"),
        variant === Variant.Danger && styles.colorVariant("danger", "dangerText"),
        variant === Variant.Info && styles.colorVariant("info", "infoText"),
        variant === Variant.Success && styles.colorVariant("success", "successText"),
        variant === Variant.Warning && styles.colorVariant("warning", "warningText")
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
