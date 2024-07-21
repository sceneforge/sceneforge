import * as stylex from "@stylexjs/stylex";

import { Dialog, type DialogProps } from "../Dialog";
import { Figure } from "../Figure";
import { type FigureProps } from "../Figure/Figure";
import { ImageButton, type ImageButtonProps } from "../ImageButton";
import { useFigureButtonDialog } from "./useFigureButtonDialog";

export type FigureButtonDialogProps = {
  disabled?: ImageButtonProps["disabled"];
  ref?: ImageButtonProps["ref"];
  scale?: ImageButtonProps["scale"];
  style?: ImageButtonProps["style"];
  variant?: DialogProps["variant"];
} & Omit<FigureProps, "frame" | "inset" | "style">;

const styles = stylex.create({
  dialog: {
    borderEndEndRadius: {
      "@media only screen and (min-width: 992px)": "0.5rem",
      "default": null,
    },
    borderEndStartRadius: {
      "@media only screen and (min-width: 992px)": "0.5rem",
      "default": null,
    },
    borderStartEndRadius: {
      "@media only screen and (min-width: 992px)": "0.5rem",
      "default": null,
    },
    borderStartStartRadius: {
      "@media only screen and (min-width: 992px)": "0.5rem",
      "default": null,
    },
    minHeight: {
      "@media only screen and (min-width: 992px)": "unset",
      "default": "100%",
    },
    minWidth: {
      "@media only screen and (min-width: 992px)": "min(85dvw, 1080px)",
      "default": "100%",
    },
  },
});

const FigureButtonDialog = ({
  alt,
  disabled,
  id,
  ref,
  scale,
  shape,
  src,
  style,
  title,
  variant,
  ...props
}: FigureButtonDialogProps) => {
  const {
    currentDialogId,
    currentId,
    dialogRef,
    handleImageButtonClick,
  } = useFigureButtonDialog({ id });

  return (
    <>
      <ImageButton
        alt={alt}
        disabled={disabled}
        id={currentId}
        onClick={handleImageButtonClick}
        ref={ref}
        scale={scale}
        shape={shape}
        src={src}
        style={style}
        title={title}
      />
      <Dialog
        id={currentDialogId}
        ref={dialogRef}
        style={styles.dialog}
        title={title || alt}
        variant={variant}
      >
        <Figure
          alt={alt}
          src={src}
          title={title}
          {...props}
          frame={false}
          inset={false}
        />
      </Dialog>
    </>
  );
};

export default FigureButtonDialog;
