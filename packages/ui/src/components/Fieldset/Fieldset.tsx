import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren, useId } from "react";

import { Variant } from "../../types";
import { FieldItem, type FieldItemProps } from "../Field";
import { color } from "../tokens.stylex";

export type FieldsetProps = PropsWithChildren<{
  fields?: FieldItemProps[];
  id?: string;
  legend?: string;
  variant?: Variant;
}>;

const styles = stylex.create({
  container: {
    backgroundColor: color.background,
    border: 0,
    borderColor: "transparent",
    borderEndEndRadius: "1rem",
    borderEndStartRadius: "1rem",
    borderWidth: "0px",
    color: color.foreground,
    display: "flex",
    flexDirection: "column",
    margin: 0,
    overflow: "clip",
    paddingBlockEnd: "0",
    paddingBlockStart: 0,
    paddingInline: 0,
  },
  legend: {
    borderBlockEndWidth: 0,
    borderColor: "currentColor",
    borderStartEndRadius: "1rem",
    borderStartStartRadius: "1rem",
    borderStyle: "solid",
    borderWidth: "0.0125rem",
    color: color.foreground,
    margin: 0,
    paddingBlock: "0.75rem",
    paddingInline: "0.5rem",
    width: "100%",
  },
  legendVariantColor: (
    background: keyof typeof color,
    text: keyof typeof color
  ) => ({
    backgroundColor: `color-mix(in srgb, ${String(color[text])} 50%, ${color.background})`,
    borderColor: color[text],
    color: color[background],
  }),
  variantColor: (background: keyof typeof color, text: keyof typeof color) => ({
    backgroundColor: color[background],
    color: color[text],
  }),
});

const Fieldset = ({ children, fields, id, legend, variant }: FieldsetProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;

  return (
    <fieldset
      id={currentId}
      {...stylex.props(
        styles.container,
        variant === Variant.Accent && styles.variantColor("accent", "accentText"),
        variant === Variant.Default && styles.variantColor("primary", "primaryText"),
        variant === Variant.Danger && styles.variantColor("danger", "dangerText"),
        variant === Variant.Info && styles.variantColor("info", "infoText"),
        variant === Variant.Success && styles.variantColor("success", "successText"),
        variant === Variant.Warning && styles.variantColor("warning", "warningText")
      )}
    >
      {legend && (
        <legend
          {...stylex.props(
            styles.legend,
            variant === Variant.Accent && styles.legendVariantColor("accentText", "accent"),
            variant === Variant.Default && styles.legendVariantColor("primaryText", "primary"),
            variant === Variant.Danger && styles.legendVariantColor("dangerText", "danger"),
            variant === Variant.Info && styles.legendVariantColor("infoText", "info"),
            variant === Variant.Success && styles.legendVariantColor("successText", "success"),
            variant === Variant.Warning && styles.legendVariantColor("warningText", "warning")
          )}
        >
          {legend}
        </legend>
      )}
      {fields && fields.length > 0 && fields.map((field, index) => (
        <FieldItem
          id={`${currentId}-field-${index}`}
          key={`${currentId}-field-${index}`}
          variant={variant}
          {...field}
        />
      ))}
      {children}
    </fieldset>
  );
};

export default Fieldset;
