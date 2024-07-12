import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  useMemo,
} from "react";

import { colorVariables } from "../../colors.stylex";
import { effects } from "../../effect.stylex";
import { Variant, VariantType } from "../../types";
import { type SpacerStyleProps, marginStyle, paddingStyle } from "../tokens.stylex";

export type ButtonProps = {
  clear?: boolean;
  dense?: boolean;
  glossy?: boolean;
  hidden?: boolean;
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
  colorVariant: (variant: VariantType, inverted?: boolean) => ({
    backgroundColor: colorVariables[`--theme-color-${inverted ? "foreground" : "background"}-${variant}`],
    boxShadow: {
      ":active": `0 0 0.2rem ${String(colorVariables[`--theme-color-${inverted ? "background" : "foreground"}-${variant}`])}`,
      ":focus-visible": `0 0 0.1rem ${String(colorVariables[`--theme-color-${inverted ? "background" : "foreground"}-${variant}`])}`,
      ":has(+ :popover-open)": `0 0 0.2rem ${String(colorVariables[`--theme-color-${inverted ? "background" : "foreground"}-${variant}`])}`,
      "default": null,
    },
    color: colorVariables[`--theme-color-${inverted ? "background" : "foreground"}-${variant}`],
    outlineColor: {
      ":focus-visible": `color-mix(in srgb, ${String(colorVariables[`--theme-color-${inverted ? "foreground" : "background"}-${variant}`])} 75%, transparent)`,
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
  hidden: {
    display: "none",
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
  glossy,
  hidden,
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
            variant && styles.colorVariant(variant, inverted),
            (variant && !inverted && glossy)
            && effects.glossyInteractive(variant),
            (variant && inverted && glossy)
            && effects.glossyInvertedInteractive(variant),
          ],
        scale && !disabled && styles.scale,
        dense && styles.dense,
        ...(margin === undefined ? [] : marginStyle(margin)),
        ...(padding === undefined ? [] : paddingStyle(currentPadding)),
        style,
        hidden && styles.hidden
      )}
    >
      {label && !children ? label : children}
    </button>
  );
};

export default Button;
