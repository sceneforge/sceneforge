import * as stylex from "@stylexjs/stylex";
import { type MouseEventHandler, type Ref, useId } from "react";

import { IconEnum } from "../../types";
import { Heading, type HeadingProps } from "../Heading";
import { IconButton } from "../IconButton";
import { Toolbar, type ToolbarProps } from "../Toolbar";
import { View } from "../View";
import { backgroundColor } from "../tokens.stylex";

export type PaneHeaderProps = {
  actions?: ToolbarProps["actions"];
  headingPadding?: HeadingProps["padding"];
  id?: string;
  inputRef?: Ref<HTMLInputElement>;
  level?: HeadingProps["level"];
  onTitleEditClick?: MouseEventHandler<HTMLButtonElement>;
  onTitleSaveClick?: MouseEventHandler<HTMLButtonElement>;
  outer?: boolean;
  ref?: Ref<HTMLHeadingElement>;
  scaleActions?: ToolbarProps["scaleActions"];
  title?: string;
  titleEditable?: boolean;
  titleEditing?: boolean;
  toolbarPadding?: ToolbarProps["padding"];
};

const styles = stylex.create({
  container: {
    alignItems: "center",
    backgroundColor: backgroundColor.alpha15,
    borderColor: backgroundColor.alpha10,
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    gap: "0.5rem",
    height: "2.5rem",
    justifyContent: "stretch",
  },
  heading: {
    fontSize: "1.125rem",
    textOverflow: "ellipsis",
  },
  headingButton: {
    opacity: {
      ":focus-within": 1,
      ":hover": 1,
      "default": 0.5,
    },
  },
  headingWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    gap: "0.25rem",
    paddingInline: "0.25rem",
  },
  hidden: {
    display: "none",
  },
  inner: {
    borderStartEndRadius: "0.25rem",
    borderStartStartRadius: "0.25rem",
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

const PaneHeader = ({
  actions,
  headingPadding = 0,
  id,
  inputRef,
  level = 2,
  onTitleEditClick,
  onTitleSaveClick,
  outer,
  ref,
  scaleActions = true,
  title,
  titleEditable,
  titleEditing,
  toolbarPadding = 0,
}: PaneHeaderProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;

  return (
    <View
      id={currentId}
      style={[
        styles.container,
        !outer && styles.inner,
      ]}
    >
      <span {...stylex.props(styles.headingWrapper)}>
        <Heading
          hidden={titleEditable && titleEditing}
          id={`${currentId}-heading`}
          level={level}
          margin={0}
          padding={headingPadding}
          ref={ref}
          style={[
            styles.heading,
            (titleEditable && titleEditing) && styles.hidden,
          ]}
        >
          {title}
        </Heading>
        {titleEditable && (
          <input
            autoFocus={titleEditing}
            defaultValue={title}
            hidden={!titleEditing}
            id={`${currentId}-heading-input`}
            type="text"
            {...stylex.props(
              styles.heading,
              styles.input,
              (!titleEditing) && styles.hidden
            )}
            autoComplete="off"
            enterKeyHint="done"
            inert={!titleEditing}
            ref={inputRef}
          />
        )}
        {titleEditable && (
          <>
            {titleEditing
              ? (
                <IconButton
                  icon={IconEnum.DoneAll}
                  label="Save Title"
                  onClick={onTitleSaveClick}
                  padding={0.25}
                  scale
                  style={styles.headingButton}
                />
              )
              : (
                <IconButton
                  icon={IconEnum.Edit}
                  label="Edit Title"
                  onClick={onTitleEditClick}
                  padding={0.25}
                  scale
                  style={styles.headingButton}
                />
              )}
          </>
        )}
      </span>
      {actions && (
        <Toolbar
          actions={actions}
          id={`${currentId}-toolbar`}
          margin={0}
          padding={toolbarPadding}
          scaleActions={scaleActions}
        />
      )}
    </View>
  );
};

export default PaneHeader;
