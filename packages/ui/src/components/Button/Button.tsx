import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
} from "react";

import { Variant } from "../../types";
import { color } from "../tokens.stylex";

export type ButtonProps = {
  clear?: boolean;
  label?: string;
  popovertarget?: string;
  style?: StyleXStyles;
  variant?: Variant;
} & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "className" | "style" | "type">;

const styles = stylex.create({
  container: {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "0.5rem",
    color: "inherit",
    cursor: "pointer",
    display: "inline-block",
    margin: 0,
    paddingBlock: "0.5rem",
    paddingInline: "0.75rem",
    textAlign: "center",
  },
  variantColor: (background: keyof typeof color, text: keyof typeof color) => ({
    ":active": {
      filter: `brightness(1.2) drop-shadow(${String(color[background])} 0 0 .15rem)`,
    },
    ":focus": {
      filter: `brightness(1.2) drop-shadow(${String(color[background])} 0 0 .25rem)`,
      outlineColor: `color-mix(in srgb, ${String(color[text])} 50%, transparent)`,
      outlineStyle: "solid",
      outlineWidth: "0.125rem",
    },
    ":hover": {
      filter: `brightness(1.2) drop-shadow(${String(color[background])} 0 0 .1rem)`,
    },
    "backgroundColor": color[background],
    "color": color[text],
  }),
});

const Button = ({
  children,
  clear = false,
  label,
  ref,
  style,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button
      aria-label={children && label ? label : undefined}
      ref={ref}
      title={label}
      type="button"
      {...props}
      {...stylex.props(
        clear
          ? []
          : [
            styles.container,
            variant === Variant.Accent && styles.variantColor("accent", "accentText"),
            variant === Variant.Default && styles.variantColor("primary", "primaryText"),
            variant === Variant.Danger && styles.variantColor("danger", "dangerText"),
            variant === Variant.Info && styles.variantColor("info", "infoText"),
            variant === Variant.Success && styles.variantColor("success", "successText"),
            variant === Variant.Warning && styles.variantColor("warning", "warningText"),
          ],
        style
      )}
    >
      {label && !children ? label : children}
    </button>
  );
};

export default Button;
