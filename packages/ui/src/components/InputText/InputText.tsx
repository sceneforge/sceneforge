import type { AllHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { colorVariables } from "../../colors.stylex";
import { Variant, VariantType } from "../../types";

export type InputTextProps = {
  ref?: Ref<HTMLInputElement>;
  variant?: Variant;
} & Omit<AllHTMLAttributes<HTMLInputElement>, "checked" | "defaultChecked" | "type">;

const styles = stylex.create({
  colorVariant: (variant: VariantType) => ({
    borderBlockEndColor: colorVariables[`--theme-color-background-${variant}`],
    color: colorVariables[`--theme-color-foreground-${variant}`],
  }),
  container: {
    backgroundColor: colorVariables["--theme-color-background-default"],
    borderBlockEndColor: colorVariables["--theme-color-background-default"],
    borderBlockEndStyle: "solid",
    borderBlockEndWidth: "0.125rem",
    borderBlockStart: "none",
    borderInline: "none",
    borderStartEndRadius: "0.25rem",
    borderStartStartRadius: "0.25rem",
    boxShadow: {
      ":focus": "0 0.125rem 0.25rem 0.0125rem color-mix(in srgb, currentColor 75%, transparent)",
      "default": "none",
    },
    outline: "none",
    paddingBlock: "0.25rem",
    paddingInline: {
      ":focus": "0.25rem",
      "default": 0,
    },
    transitionDuration: "0.25s",
    transitionProperty: "box-shadow padding",
    width: "100%",
  },
});

const InputText = ({ ref, variant, ...props }: InputTextProps) => {
  return (
    <input
      type="text"
      {...props}
      ref={ref}
      {...stylex.props(
        styles.container,
        variant && styles.colorVariant(variant)
      )}
    />
  );
};

export default InputText;
