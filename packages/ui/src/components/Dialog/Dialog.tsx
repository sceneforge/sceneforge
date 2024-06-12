import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  type DialogHTMLAttributes,
  type Ref,
} from "react";

import { Heading } from "../Heading";
import { IconEnum, Variant } from "../../types";
import { IconButton } from "../IconButton";
import { Toolbar, ToolbarProps } from "../Toolbar";
import { useDialog } from "./useDialog";
import { backgroundColor, color } from "../tokens.stylex";

export type DialogProps = Omit<DialogHTMLAttributes<HTMLDialogElement>, "style"> & {
  description?: string;
  extendedClassName?: string;
  title?: string;
  toolbar?: ToolbarProps;
  variant?: Variant;
  ref?: Ref<HTMLDialogElement>;
  style?: StyleXStyles;
};

const styles = stylex.create({
  container: {
    position: "fixed",
    insetBlock: "50%",
    insetInline: "50%",
    margin: 0,
    padding: 0,
    minWidth: "16rem",
    display: "flex",
    flexDirection: "column",
    transform: "translateX(-50%) translateY(-50%)",
    overflow: "clip",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "0.5rem",
    color: "inherit",
    "::backdrop": {
      height: "100%",
      width: "100%",
      backdropFilter: "blur(2px) grayscale(60%)",
    },
    borderColor: backgroundColor.alpha10,
  },
  containerColor: () => ({
    filter: `drop-shadow(0 25px 25px color-mix(in srgb, ${color.foreground} 15%, transparent))`,
  }),
  variantColor: (background: keyof typeof color, text: keyof typeof color) => ({
    backgroundColor: color[background],
    color: color[text],
    "::backdrop": {
      backgroundColor: `color-mix(in srgb, ${String(color[background])} 10%, transparent)`
    }
  }),
  heading: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "stretch",
    gap: "0.5rem",
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    padding: "0.5rem",
    borderBlockEndColor: backgroundColor.alpha20,
    backgroundColor: backgroundColor.alpha10,
  },
  head: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
    textAlign: "start",
    textWrap: "nowrap",
    fontSize: "1rem",
  },
  closeButton: {
    flexShrink: 1,
    width: "1.25rem",
    height: "1.25rem",
    padding: "0.125rem",
  },
  document: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "stretch",
    textAlign: "start",
    fontSize: "0.875rem",
    backgroundColor: backgroundColor.alpha25,
  },
  innerContent: {
    marginBlockEnd: "1rem",
    padding: "0.5rem",
  },
  descriptionParagraph: {
    margin: 0,
  },
  toolbar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem",
    textAlign: "center",
    backgroundColor: backgroundColor.alpha10,
  },
});

const Dialog = (
  {
    children,
    description,
    extendedClassName,
    onCancel,
    onClose,
    open = true,
    title,
    toolbar,
    variant,
    style,
    ref,
    ...props
  }: DialogProps,

) => {
  const { dialogRef, handleCloseClick, headId, descriptionId } = useDialog({ open, ref });

  return (
    <dialog
      aria-describedby={description && descriptionId}
      aria-labelledby={headId}
      onCancel={onCancel}
      onClose={onClose}
      {...props}
      ref={dialogRef}
      {...stylex.props(
        styles.container,
        styles.containerColor(),
        styles.variantColor("foreground", "background"),
        variant === Variant.Default && styles.variantColor("primary", "primaryText"),
        variant === Variant.Accent && styles.variantColor("accent", "accentText"),
        variant === Variant.Danger && styles.variantColor("danger", "dangerText"),
        variant === Variant.Info && styles.variantColor("info", "infoText"),
        variant === Variant.Success && styles.variantColor("success", "successText"),
        variant === Variant.Warning && styles.variantColor("warning", "warningText"),
      )}
    >
      <div {...stylex.props(styles.heading, style)}>
        <Heading
          id={headId}
          level={1}
          style={[styles.head]}
        >
          {title}
        </Heading>
        <IconButton
          inverted
          autoFocus
          style={styles.closeButton}
          icon={IconEnum.Close}
          size={3}
          label="Close"
          onClick={handleCloseClick}
        />
      </div>
      <div role="document" {...stylex.props(styles.document)}>
        <div {...stylex.props(styles.innerContent)}>
          {description && (
            <p {...stylex.props(styles.descriptionParagraph)} id={descriptionId}>
              {description}
            </p>
          )}
          {children && (
            <div role={description ? "complementary" : undefined}>
              {children}
            </div>
          )}
        </div>
        {toolbar && toolbar.actions && toolbar.actions.length > 0 && (
          <div {...stylex.props(styles.toolbar)}>
            <Toolbar {...toolbar} />
          </div>
        )}
      </div>
    </dialog>
  );
};

export default Dialog;
