import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren, useId } from "react";

import type { Variant } from "../../types";

import { backgroundColor, colorStyles, currentColor, foregroundColor } from "../../colors.stylex";
import { effects } from "../../effect.stylex";
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
    borderBlockEndWidth: "0.0625rem",
    borderStartEndRadius: "1rem",
    borderStartStartRadius: "1rem",
    color: foregroundColor.default,
    margin: 0,
    paddingBlock: "0.75rem",
    paddingInline: "0.5rem",
    width: "100%",
  },
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
            variant && effects.glossyInverted(variant)
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
