import * as stylex from "@stylexjs/stylex";
import { type RefObject } from "react";

import { IconEnum, Variant } from "../../types";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { backgroundColor, backgroundTextColorVariantStyle, color } from "../tokens.stylex";

export type CommandBarProps = {
  label?: string;
  name?: string;
  open?: boolean;
  placeholder?: string;
  ref?: RefObject<HTMLDialogElement | null>;
  variant?: Variant;
};

const styles = stylex.create({
  closeButton: {
    "@media only screen and (min-width: 768px)": {
      display: "none",
    },
    "flexShrink": 1,
  },
  container: {
    "::backdrop": {
      backdropFilter: "blur(5rem)",
      backgroundColor: `color-mix(in srgb, ${color.foreground} 25%, transparent)`,
      inset: 0,
      position: "absolute",
    },
    "@media only screen and (min-width: 768px)": {
      backgroundColor: backgroundColor.alpha75,
      borderColor: `color-mix(in srgb, ${color.foreground} 25%, transparent)`,
      borderRadius: "0.75rem",
      borderStyle: "solid",
      borderWidth: "0.0625rem",
      boxContent: "border-box",
      height: "min-content",
      insetBlockStart: "15dvh",
      insetInlineStart: "50%",
      margin: 0,
      maxHeight: "85dvh",
      maxWidth: "85dvw",
      overflow: "clip",
      padding: "0.5rem",
      position: "fixed",
      transform: "translateX(-50%)",
    },
    "height": "100dvh",
    "width": "100dvw",
  },
  detailList: {
    display: "grid",
    gridAutoFlow: "row",
  },
  input: {
    "@media only screen and (min-width: 768px)": {
      width: "40dvw",
    },
    "backgroundColor": color.background,
    "borderColor": `color-mix(in srgb, ${color.foreground} 25%, transparent)`,
    "borderRadius": "0.5rem",
    "borderStyle": "solid",
    "borderWidth": "0.0625rem",
    "color": color.foreground,
    "flexGrow": 1,
    "height": "2.5rem",
    "paddingInline": "0.5rem",
    "width": "100%",
  },
  inputView: {
    display: "flex",
    flexFlow: "row",
    flexWrap: "nowrap",
    height: "min-content",
    justifyContent: "stretch",
    width: "100%",
  },
  listOption: {
    color: color.foreground,
    textAlign: "start",
    width: "100%",
  },
  listTitle: {
    color: `color-mix(in srgb, ${color.foreground} 75%, ${color.background})`,
    fontSize: "0.65rem",
    fontWeight: "bold",
    paddingBlockStart: "0.5rem",
    textAlign: "start",
  },
});

const CommandBar = ({
  name,
  open,
  placeholder = "Type a command...",
  ref,
  variant,
}: CommandBarProps) => {
  return (
    <dialog
      open={open}
      {...stylex.props(
        styles.container,
        backgroundTextColorVariantStyle(variant)
      )}
      ref={ref}
    >
      <form {...stylex.props(styles.inputView)} method="dialog">
        <input
          autoFocus
          name={name}
          placeholder={placeholder}
          type="text"
          {...stylex.props(
            styles.input
          )}
        />
        <IconButton
          icon={IconEnum.Close}
          label="Close"
          style={[styles.closeButton]}
          type="submit"
        />
      </form>
      <dl
        {...stylex.props(
          styles.detailList
        )}
      >
        <dt
          {...stylex.props(styles.listTitle)}
        >
          Latest Input
        </dt>
        <dd>
          <Button style={[styles.listOption]}>Command 1</Button>
        </dd>
        <dd>
          <Button style={[styles.listOption]}>Command 2</Button>
        </dd>
        <dd>
          <Button style={[styles.listOption]}>Command 3</Button>
        </dd>
        <dd>
          <Button style={[styles.listOption]}>Command 4</Button>
        </dd>
        <dt
          {...stylex.props(styles.listTitle)}
        >
          Suggest
        </dt>
        <dd>
          <Button style={[styles.listOption]}>Suggested Command 1</Button>
        </dd>
        <dd>
          <Button style={[styles.listOption]}>Suggested Command 2</Button>
        </dd>
        <dd>
          <Button style={[styles.listOption]}>Suggested Command 3</Button>
        </dd>
        <dd>
          <Button style={[styles.listOption]}>Suggested Command 4</Button>
        </dd>
      </dl>
    </dialog>
  );
};

export default CommandBar;
