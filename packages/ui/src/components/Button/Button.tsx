import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  useMemo,
} from "react";

import { borderStyles, roundedStyles } from "../../borders.stylex";
import { colorStyles } from "../../colors.stylex";
import { boxShadowInteractiveStyles, glossyInteractiveStyles, outlineInteractiveStyles } from "../../effect.stylex";
import { Shape, Variant } from "../../types";
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
  shape?: Shape;
  style?: StyleXStyles;
  variant?: Variant;
} & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "className" | "style">;

const styles = stylex.create({
  container: {
    backgroundColor: "transparent",
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
    filter: {
      ":active": "brightness(1.1)",
      ":focus-visible": "brightness(1.05)",
      ":has(+ :popover-open)": "brightness(1.1)",
      ":hover:not(:has(+ :popover-open))": "brightness(1.2)",
      "default": null,
    },
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
      ":active": 1.075,
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
  shape = Shape.Rounded,
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
            borderStyles.noBorder,
            borderStyles.outline,
            borderStyles.outlineSize(3),
            borderStyles.outlineOffset(2),
            boxShadowInteractiveStyles.default,
            outlineInteractiveStyles.currentColor(50),
            variant && outlineInteractiveStyles.variant(variant, 50),
            variant && boxShadowInteractiveStyles.variant(variant),
            variant && !inverted && colorStyles.variant(variant),
            variant && inverted && colorStyles.inverted(variant),
            (variant && glossy && !inverted)
            && glossyInteractiveStyles.variant(variant),
            (variant && glossy && inverted)
            && glossyInteractiveStyles.inverted(variant),
          ],
        shape === Shape.Rounded && roundedStyles.rounded(2),
        shape === Shape.Circle && roundedStyles.circle,
        shape === Shape.Squircle && roundedStyles.squircle,
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
