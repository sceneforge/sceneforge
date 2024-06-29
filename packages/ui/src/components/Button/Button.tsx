import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  useMemo,
} from "react";

import { Variant } from "../../types";
import { type SpacerStyleProps, color, marginStyle, paddingStyle } from "../tokens.stylex";

export type ButtonProps = {
  clear?: boolean;
  dense?: boolean;
  inverted?: boolean;
  label?: string;
  margin?: SpacerStyleProps;
  padding?: SpacerStyleProps;
  popovertarget?: string;
  scale?: boolean;
  style?: StyleXStyles;
  variant?: Variant;
} & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "className" | "style">;

const styles = stylex.create({
  colorVariant: (background: keyof typeof color, text: keyof typeof color) => ({
    backgroundColor: color[background],
    boxShadow: {
      ":active": `0 0 0.2rem ${String(color[text])}`,
      ":focus-visible": `0 0 0.1rem ${String(color[text])}`,
      ":has(+ :popover-open)": `0 0 0.2rem ${String(color[text])}`,
      "default": null,
    },
    color: color[text],
    outlineColor: {
      ":focus-visible": `color-mix(in srgb, ${String(color[text])} 75%, transparent)`,
      "default": "transparent",
    },
  }),
  container: {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "0.5rem",
    color: "inherit",
    cursor: "pointer",
    display: "inline-block",
    textAlign: "center",
  },
  defaultContainer: {
    backgroundColor: {
      ":active": "SelectedItem",
      ":focus-visible": "color-mix(in srgb, SelectedItem 15%, transparent)",
      ":has(+ :popover-open)": "SelectedItem",
      ":hover:not(:has(+ :popover-open))": "color-mix(in srgb, Canvas 25%, transparent)",
      "default": "transparent",
    },
    boxShadow: {
      ":active": "0 0 0.2rem SelectedItem",
      ":focus-visible": "0 0 0.1rem SelectedItem",
      ":has(+ :popover-open)": "0 0 0.2rem SelectedItem",
      ":hover:not(:has(+ :popover-open))": null,
      "default": null,
    },
    filter: {
      ":active": "brightness(1.1)",
      ":focus-visible": "brightness(1.05)",
      ":has(+ :popover-open)": "brightness(1.1)",
      ":hover:not(:has(+ :popover-open))": "brightness(1.2)",
      "default": null,
    },
    outlineColor: {
      ":focus-visible": "color-mix(in srgb, SelectedItem 75%, transparent)",
      "default": "transparent",
    },
    outlineStyle: "solid",
    outlineWidth: "0.125rem",
  },
  dense: {
    fontSize: "0.875rem",
  },
  disabled: {
    cursor: "default",
    filter: "grayscale(0.5)",
  },
  scale: {
    scale: {
      ":focus-visible": 1.05,
      ":has(+ :popover-open)": 1.1,
      ":hover": 1.1,
      "default": 1,
    },
    transition: "scale 0.12s ease-in-out",
  },
});

const Button = ({
  children,
  clear = false,
  dense,
  disabled,
  inverted,
  label,
  margin = 0,
  padding = {
    block: 0.5,
    inline: 0.75,
  },
  ref,
  scale,
  style,
  variant,
  ...props
}: ButtonProps) => {
  const currentPadding = useMemo(() => {
    if (dense && typeof padding === "number") {
      return padding / 2;
    }
    if (dense && typeof padding === "object" && padding !== null) {
      const {
        block,
        blockEnd,
        blockStart,
        default: defaultPadding,
        inline,
        inlineEnd,
        inlineStart,
      } = padding;
      return {
        block: block === undefined ? undefined : block / 2,
        blockEnd: blockEnd === undefined ? undefined : blockEnd / 2,
        blockStart: blockStart === undefined ? undefined : blockStart / 2,
        default: defaultPadding === undefined ? undefined : defaultPadding / 2,
        inline: inline === undefined ? undefined : inline / 2,
        inlineEnd: inlineEnd === undefined ? undefined : inlineEnd / 2,
        inlineStart: inlineStart === undefined ? undefined : inlineStart / 2,
      };
    }
    return padding;
  }, [dense, padding]);

  return (
    <button
      aria-label={children && label ? label : undefined}
      disabled={disabled}
      ref={ref}
      title={label}
      type="button"
      {...props}
      {...stylex.props(
        styles.container,
        clear
          ? []
          : [
            styles.defaultContainer,
            disabled && styles.disabled,
            !inverted && variant === Variant.Accent && styles.colorVariant("accent", "accentText"),
            !inverted && variant === Variant.Default && styles.colorVariant("primary", "primaryText"),
            !inverted && variant === Variant.Danger && styles.colorVariant("danger", "dangerText"),
            !inverted && variant === Variant.Info && styles.colorVariant("info", "infoText"),
            !inverted && variant === Variant.Success && styles.colorVariant("success", "successText"),
            !inverted && variant === Variant.Warning && styles.colorVariant("warning", "warningText"),
            inverted && variant === Variant.Accent && styles.colorVariant("accentText", "accent"),
            inverted && variant === Variant.Default && styles.colorVariant("primaryText", "primary"),
            inverted && variant === Variant.Danger && styles.colorVariant("dangerText", "danger"),
            inverted && variant === Variant.Info && styles.colorVariant("infoText", "info"),
            inverted && variant === Variant.Success && styles.colorVariant("successText", "success"),
            inverted && variant === Variant.Warning && styles.colorVariant("warningText", "warning"),
          ],
        scale && !disabled && styles.scale,
        dense && styles.dense,
        ...(margin === undefined ? [] : marginStyle(margin)),
        ...(padding === undefined ? [] : paddingStyle(currentPadding)),
        style
      )}
    >
      {label && !children ? label : children}
    </button>
  );
};

export default Button;
