import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
} from "react";

import { Variant } from "../../types";
import { color } from "../tokens.stylex";

export type ButtonProps = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "type" | "className" | "style"> & {
  label?: string;
  popovertarget?: string;
  variant?: Variant;
  clear?: boolean;
  style?: StyleXStyles
};

const styles = stylex.create({
  container: {
    cursor: "pointer",
    border: "none",
    margin: 0,
    display: "inline-block",
    textAlign: "center",
    paddingInline: "0.75rem",
    paddingBlock: "0.5rem",
    borderRadius: "0.5rem",
    backgroundColor: "transparent",
    color: "inherit",
  },
  variantColor: (background: keyof typeof color, text: keyof typeof color) => ({
    backgroundColor: color[background],
    color: color[text],
    ":hover": {
      filter: `brightness(1.2) drop-shadow(${String(color[background])} 0 0 .1rem)`,
    },
    ":active": {
      filter: `brightness(1.2) drop-shadow(${String(color[background])} 0 0 .15rem)`,
    },
    ":focus": {
      outlineStyle: "solid",
      outlineWidth: "0.125rem",
      outlineColor: `color-mix(in srgb, ${String(color[text])} 50%, transparent)`,
      filter: `brightness(1.2) drop-shadow(${String(color[background])} 0 0 .25rem)`,
    }
  }),
});

const Button = ({
  children,
  label,
  variant,
  clear = false,
  ref,
  style,
  ...props
}: ButtonProps) => {
  return (
    <button
      aria-label={children && label ? label : undefined}
      type="button"
      ref={ref}
      title={label}
      {...props}
      {...stylex.props(
        !clear ? [
          styles.container,
          variant === Variant.Accent && styles.variantColor("accent", "accentText"),
          variant === Variant.Default && styles.variantColor("primary", "primaryText"),
          variant === Variant.Danger && styles.variantColor("danger", "dangerText"),
          variant === Variant.Info && styles.variantColor("info", "infoText"),
          variant === Variant.Success && styles.variantColor("success", "successText"),
          variant === Variant.Warning && styles.variantColor("warning", "warningText"),
        ] : [],
        style
      )}
    >
      {label && !children ? label : children}
    </button>
  );
};

export default Button;
