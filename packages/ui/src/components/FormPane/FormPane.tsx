import type { DetailedHTMLProps, FormHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { Pane, type PaneProps } from "../Pane";
import { type FormPaneRef, useFormPane } from "./useFormPane";

export type OriginalFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>, HTMLFormElement
>;

export type FormPaneProps = {
  acceptCharset?: OriginalFormProps["acceptCharset"];
  action?: OriginalFormProps["action"];
  autoComplete?: OriginalFormProps["autoComplete"];
  encType?: OriginalFormProps["encType"];
  method?: OriginalFormProps["method"];
  name?: OriginalFormProps["name"];
  noValidate?: OriginalFormProps["noValidate"];
  onReset?: OriginalFormProps["onReset"];
  onSubmit?: OriginalFormProps["onSubmit"];
  ref?: Ref<FormPaneRef>;
  target?: OriginalFormProps["target"];
} & Omit<PaneProps, "ref">;

const styles = stylex.create({
  container: {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  },
});

const FormPane = ({
  action,
  autoComplete,
  encType,
  id,
  method,
  name,
  noValidate,
  onReset,
  onSubmit,
  ref,
  target,
  ...props
}: FormPaneProps) => {
  const {
    currentId,
    formRef,
    paneRef,
  } = useFormPane({ id, ref });

  return (
    <form
      action={action}
      autoComplete={autoComplete}
      encType={encType}
      id={currentId}
      method={method}
      name={name}
      noValidate={noValidate}
      onReset={onReset}
      onSubmit={onSubmit}
      ref={formRef}
      target={target}
      {...stylex.props(styles.container)}
    >
      <Pane
        {...props}
        id={`${currentId}-pane`}
        ref={paneRef}
      />
    </form>
  );
};

export default FormPane;
