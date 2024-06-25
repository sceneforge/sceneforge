import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import {
  type DialogHTMLAttributes,
  type Ref,
} from "react";

import { IconEnum, Variant } from "../../types";
import { Heading } from "../Heading";
import { IconButton } from "../IconButton";
import { Toolbar, ToolbarProps } from "../Toolbar";
import { backgroundColor, backgroundTextColorVariantStyle, color } from "../tokens.stylex";
import { useDialog } from "./useDialog";

export type DialogProps = {
  description?: string;
  ref?: Ref<HTMLDialogElement>;
  style?: StyleXStyles;
  title?: string;
  toolbar?: ToolbarProps;
  variant?: Variant;
} & Omit<DialogHTMLAttributes<HTMLDialogElement>, "style">;

const styles = stylex.create({
  closeButton: {
    flexShrink: 1,
    height: "1.25rem",
    padding: "0.125rem",
    width: "1.25rem",
  },
  container: {
    "::backdrop": {
      backdropFilter: "blur(2px) grayscale(60%)",
      backgroundColor: `color-mix(in srgb, ${color.foreground} 10%, transparent)`,
      height: "100%",
      width: "100%",
    },
    "backgroundColor": "ButtonFace",
    "borderColor": backgroundColor.alpha10,
    "borderRadius": "0.5rem",
    "borderStyle": "solid",
    "borderWidth": "1px",
    "color": "ButtonText",
    "display": "flex",
    "flexDirection": "column",
    "insetBlock": "50%",
    "insetInline": "50%",
    "margin": 0,
    "minWidth": "16rem",
    "overflow": "clip",
    "padding": 0,
    "position": "fixed",
    "transform": "translateX(-50%) translateY(-50%)",
  },
  containerColor: () => ({
    filter: `drop-shadow(0 25px 25px color-mix(in srgb, ${color.foreground} 15%, transparent))`,
  }),
  descriptionParagraph: {
    margin: 0,
  },
  document: {
    backgroundColor: backgroundColor.alpha25,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    fontSize: "0.875rem",
    justifyContent: "stretch",
    textAlign: "start",
  },
  head: {
    flexGrow: 1,
    fontSize: "1rem",
    margin: 0,
    padding: 0,
    textAlign: "start",
    textWrap: "nowrap",
  },
  heading: {
    alignItems: "center",
    backgroundColor: backgroundColor.alpha10,
    borderBlockEndColor: backgroundColor.alpha20,
    borderBlockEndStyle: "solid",
    borderBlockEndWidth: "1px",
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    flexWrap: "nowrap",
    gap: "0.5rem",
    justifyContent: "stretch",
    padding: "0.5rem",
  },
  innerContent: {
    marginBlockEnd: "1rem",
    padding: "0.5rem",
  },
  toolbar: {
    alignItems: "center",
    backgroundColor: backgroundColor.alpha10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "0.5rem",
    textAlign: "center",
    width: "100%",
  },
});

const Dialog = (
  {
    children,
    description,
    onCancel,
    onClose,
    open = true,
    ref,
    style,
    title,
    toolbar,
    variant,
    ...props
  }: DialogProps

) => {
  const {
    descriptionId,
    dialogRef,
    handleCloseClick,
    headId,
  } = useDialog({ open, ref });

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
        backgroundTextColorVariantStyle(variant)
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
          autoFocus
          icon={IconEnum.Close}
          inverted
          label="Close"
          onClick={handleCloseClick}
          size={3}
          style={styles.closeButton}
        />
      </div>
      <div role="document" {...stylex.props(styles.document)}>
        <div {...stylex.props(styles.innerContent)}>
          {description && (
            <p
              {...stylex.props(
                styles.descriptionParagraph
              )}
              id={descriptionId}
            >
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
