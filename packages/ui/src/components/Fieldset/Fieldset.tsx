import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren, useId } from "react";

import { Variant } from "../../types";
import { FieldItem, type FieldItemProps } from "../Field";
import { backgroundTextColorVariantStyle, color } from "../tokens.stylex";

export type FieldsetProps = PropsWithChildren<{
  fields?: FieldItemProps[];
  id?: string;
  legend?: string;
  variant?: Variant;
}>;

const styles = stylex.create({
  container: {
    backgroundColor: `color-mix(in srgb, currentColor 10%, ${color.background})`,
    border: 0,
    borderRadius: "1rem",
    color: color.foreground,
    display: "flex",
    flexDirection: "column",
    margin: 0,
    outlineColor: "color-mix(in srgb, currentColor 35%, transparent)",
    outlineStyle: "solid",
    outlineWidth: "0.0125rem",
    overflow: "clip",
    paddingBlockEnd: "0",
    paddingBlockStart: 0,
    paddingInline: 0,
  },
  legend: {
    backgroundColor: color.background,
    borderBlockEndColor: "color-mix(in srgb, currentColor 35%, transparent)",
    borderBlockEndStyle: "solid",
    borderBlockEndWidth: "0.0125rem",
    borderStartEndRadius: "1rem",
    borderStartStartRadius: "1rem",
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
  withVariant: {
    borderStartEndRadius: 0,
    borderStartStartRadius: 0,
    outlineColor: "transparent",
    outlineStyle: "none",
    outlineWidth: 0,
  },
});

const Fieldset = ({ children, fields, id, legend, variant }: FieldsetProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;

  return (
    <fieldset
      id={currentId}
      {...stylex.props(
        styles.container,
        ...backgroundTextColorVariantStyle(variant),
        variant && styles.withVariant
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
