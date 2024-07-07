import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type MouseEventHandler, type Ref, useId } from "react";

import { IconEnum } from "../../types";
import { IconButton, type IconButtonProps } from "../IconButton";
import { View } from "../View";

export type PaneHeaderInputProps = {
  buttonPadding?: IconButtonProps["padding"];
  defaultValue?: string;
  editing?: boolean;
  id?: string;
  onEditClick?: MouseEventHandler<HTMLButtonElement>;
  onSaveClick?: MouseEventHandler<HTMLButtonElement>;
  ref?: Ref<HTMLInputElement>;
  style?: StyleXStyles;
};

const styles = stylex.create({
  button: {
    flexShrink: 1,
    margin: "0.25rem",
    opacity: {
      ":focus-within": 1,
      ":hover": 1,
      "default": 0.5,
    },
  },
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    justifyContent: "flex-start",
  },
  hidden: {
    display: "none",
  },
  input: {
    background: "color-mix(in srgb, Canvas 15%, transparent)",
    border: "none",
    borderRadius: "0.125rem",
    color: "inherit",
    display: "inline",
    maxWidth: "fit-content",
    minWidth: "min-content",
    outline: "none",
    paddingBlock: "0.25rem",
    paddingInline: "0.5rem",
  },
});

const PaneHeaderInput = ({
  buttonPadding = 0.25,
  defaultValue,
  editing,
  id,
  onEditClick,
  onSaveClick,
  ref,
  style,
}: PaneHeaderInputProps) => {
  const generatedId = useId();
  const currentId = id || generatedId;

  return (
    <View style={styles.container}>
      <input
        autoFocus={editing}
        defaultValue={defaultValue}
        hidden={!editing}
        id={currentId}
        type="text"
        {...stylex.props(
          styles.input,
          (!editing) && styles.hidden,
          style
        )}
        autoComplete="off"
        enterKeyHint="done"
        inert={!editing}
        ref={ref}
      />
      {editing
        ? (
          <IconButton
            icon={IconEnum.DoneAll}
            label="Save Title"
            onClick={onSaveClick}
            padding={buttonPadding}
            scale
            style={styles.button}
          />
        )
        : (
          <IconButton
            icon={IconEnum.Edit}
            label="Edit Title"
            onClick={onEditClick}
            padding={buttonPadding}
            scale
            style={styles.button}
          />
        )}
    </View>
  );
};

export default PaneHeaderInput;
