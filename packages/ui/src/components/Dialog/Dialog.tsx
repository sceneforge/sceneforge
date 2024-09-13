import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import {
  type DialogHTMLAttributes,
  type Ref,
} from "react";

import { borderStyles, roundedStyles } from "../../borders.stylex";
import {
  colorStyles,
  foregroundColor,
} from "../../colors.stylex";
import { IconEnum, Variant } from "../../types";
import { Divider } from "../Divider";
import { Pane, type PaneProps } from "../Pane";
import { View } from "../View";
import { useDialog } from "./useDialog";

export type DialogProps = {
  actions?: PaneProps["paneActions"];
  actionsGap?: PaneProps["paneActionsGap"];
  actionsHidden?: PaneProps["paneActionsHidden"];
  actionsMargin?: PaneProps["paneActionsMargin"];
  actionsPadding?: PaneProps["paneActionsPadding"];
  actionsStyle?: PaneProps["paneActionsStyle"];
  description?: string;
  ref?: Ref<HTMLDialogElement>;
  style?: StyleXStyles;
  title?: string;
  variant?: Variant;
} & Omit<DialogHTMLAttributes<HTMLDialogElement>, "className" | "style">;

const styles = stylex.create({
  backdrop: {
    "::backdrop": {
      backdropFilter: "blur(2px) grayscale(60%)",
      backgroundColor: foregroundColor.alpha10,
      height: "100%",
      width: "100%",
    },
  },
  container: {
    boxShadow: [
      `0 0.25rem 0.625rem 0.25rem ${foregroundColor.alpha35}`,
      `0 0.5rem 4rem 3rem ${foregroundColor.alpha15}`,
      `0 1rem 6rem 8rem ${foregroundColor.alpha05}`,
    ].join(", "),
    insetBlock: "50%",
    insetInline: "50%",
    margin: 0,
    minWidth: "16rem",
    overflow: "clip",
    padding: 0,
    position: "fixed",
    translate: "-50% -50%",
  },
  hidden: {
    display: "none",
  },
});

const Dialog = ({
  actions,
  actionsGap,
  actionsHidden,
  actionsMargin,
  actionsPadding,
  actionsStyle,
  children,
  description,
  hidden,
  onCancel,
  onClose,
  open,
  ref,
  style,
  title,
  variant,
  ...props
}: DialogProps) => {
  const {
    descriptionId,
    dialogRef,
    handleCloseClick,
    headId,
    // eslint-disable-next-line react-compiler/react-compiler
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
        borderStyles.border,
        borderStyles.borderDefault(25),
        borderStyles.borderSize(1),
        colorStyles.default,
        roundedStyles.rounded(2),
        styles.backdrop,
        styles.container,
        variant && borderStyles.borderVariant(variant, 100),
        variant && colorStyles.variant(variant),
        style,
        hidden && styles.hidden
      )}
    >
      <Pane
        actions={[
          {
            autoFocus: true,
            dense: true,
            icon: IconEnum.Close,
            kind: "icon",
            label: "Close",
            onClick: handleCloseClick,
          },
        ]}
        headingPadding={{
          inline: 0.25,
        }}
        outer
        paneActions={actions}
        paneActionsGap={actionsGap}
        paneActionsHidden={actionsHidden}
        paneActionsMargin={actionsMargin}
        paneActionsPadding={actionsPadding}
        paneActionsStyle={actionsStyle}
        title={title}
      >
        <View
          padding={0.5}
          scrollable
        >
          {description && (
            <>
              <p id={descriptionId}>
                {description}
              </p>
              {children && (<Divider margin={0.5} />)}
            </>
          )}
          {children}
        </View>
      </Pane>
    </dialog>
  );
};

export default Dialog;
