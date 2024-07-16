import type { AllHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { borderStyles, roundedStyles } from "../../borders.stylex";
import { colorStyles } from "../../colors.stylex";
import { Variant } from "../../types";

export type InputTextProps = {
  ref?: Ref<HTMLInputElement>;
  variant?: Variant;
} & Omit<AllHTMLAttributes<HTMLInputElement>, "checked" | "defaultChecked" | "type">;

const styles = stylex.create({
  container: {
    boxShadow: {
      ":focus": "0 0.125rem 0.25rem 0.0125rem color-mix(in srgb, currentColor 75%, transparent)",
      "default": "none",
    },
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
        colorStyles.default,
        borderStyles.noBorder,
        borderStyles.borderBlockEnd,
        borderStyles.borderBlockEndSize(3),
        borderStyles.borderBlockEndCurrentColor(100),
        borderStyles.noOutline,
        roundedStyles.roundedBlockStart(1),
        variant && borderStyles.borderBlockEndVariant(variant, 100),
        variant && colorStyles.inverted(variant)
      )}
    />
  );
};

export default InputText;
