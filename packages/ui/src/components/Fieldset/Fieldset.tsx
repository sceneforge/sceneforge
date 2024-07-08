import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren, useId } from "react";

import { backgroundColor, colorStyles, colorVariables, currentColor, foregroundColor } from "../../colors.stylex";
import { Variant, VariantType } from "../../types";
import { FieldItem, type FieldItemProps } from "../Field";

export type FieldsetProps = PropsWithChildren<{
  fields?: FieldItemProps[];
  id?: string;
  legend?: string;
  variant?: Variant;
}>;

const styles = stylex.create({
  container: {
    backgroundColor: backgroundColor.alpha15,
    border: 0,
    borderRadius: "1rem",
    color: foregroundColor.default,
    display: "flex",
    flexDirection: "column",
    margin: 0,
    outlineColor: currentColor.alpha35,
    outlineStyle: "solid",
    outlineWidth: "0.0125rem",
    overflow: "clip",
    paddingBlockEnd: "0",
    paddingBlockStart: 0,
    paddingInline: 0,
  },
  legend: {
    backgroundColor: backgroundColor.default,
    borderBlockEndColor: currentColor.alpha35,
    borderBlockEndStyle: "solid",
    borderBlockEndWidth: "0.0125rem",
    borderStartEndRadius: "1rem",
    borderStartStartRadius: "1rem",
    color: foregroundColor.default,
    margin: 0,
    paddingBlock: "0.75rem",
    paddingInline: "0.5rem",
    width: "100%",
  },
  legendVariantColor: (variant: VariantType) => ({
    backgroundColor: `color-mix(in srgb, ${String(colorVariables[`--theme-color-foreground-${variant}`])} 75%, ${colorVariables[`--theme-color-background-${variant}`]})`,
    borderColor: `color-mix(in srgb, ${String(colorVariables[`--theme-color-foreground-${variant}`])} 25%, ${colorVariables[`--theme-color-background-${variant}`]})`,
    color: colorVariables[`--theme-color-background-${variant}`],
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
        variant && colorStyles.backgroundVariant(variant),
        variant && colorStyles.foregroundBackgroundVariant(variant),
        variant && styles.withVariant
      )}
    >
      {legend && (
        <legend
          {...stylex.props(
            styles.legend,
            variant && styles.legendVariantColor(variant)
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
