import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { useCurrentId } from "../../hooks";
import { Variant } from "../../types";
import { Button, ButtonProps } from "../Button";
import { Fieldset, type FieldsetProps } from "../Fieldset";
import { View } from "../View";

export type FormProps = {
  columns?: number;
  fieldsets?: FieldsetProps[];
  gap?: number;
  ref?: Ref<HTMLFormElement>;
  reset?: ButtonProps | string;
  style?: StyleXStyles;
  submit?: ButtonProps | string;
  variant?: Variant;
} & Omit<AllHTMLAttributes<HTMLFormElement>, "style">;

const styles = stylex.create({
  buttons: {
    alignContent: "center",
    display: "grid",
    gridAutoFlow: "column",
    gridColumn: "1 / -1",
    justifyContent: "center",
  },
  columns: (value: number) => ({
    gridTemplateColumns: `repeat(${value}, 1fr)`,
  }),
  container: {
    display: "grid",
    flexShrink: 1,
    gap: "1rem",
    height: "100%",
    width: "100%",
  },
  gap: (value: number) => ({
    gap: `${value}rem`,
  }),
});

const Form = ({
  children,
  columns = 1,
  fieldsets,
  gap = 1,
  id,
  ref,
  reset,
  style,
  submit,
  variant,
  ...props
}: FormProps) => {
  const currentId = useCurrentId(id);

  return (
    <form
      {...props}
      id={currentId}
      ref={ref}
      {...stylex.props(
        styles.container,
        styles.gap(gap),
        styles.columns(columns),
        style
      )}
    >
      {fieldsets && fieldsets.map((fieldset, index) => (
        <View key={`${currentId}-fieldset-${index}`}>
          <Fieldset
            id={`${currentId}-fieldset-${index}`}
            variant={variant}
            {...fieldset}
          />
        </View>
      ))}
      {children}
      {(submit || reset) && (
        <View
          style={[
            styles.buttons,
            styles.gap(gap),
          ]}
        >
          {(submit && (typeof submit === "string"
            ? (<Button type="submit" variant={variant}>{submit}</Button>)
            : (<Button variant={variant} {...submit} type="submit" />)
          ))}
          {(reset && (typeof reset === "string"
            ? (<Button type="reset" variant={variant}>{reset}</Button>)
            : (<Button variant={variant} {...reset} type="reset" />))
          )}
        </View>
      )}
    </form>
  );
};

export default Form;
