import * as stylex from "@stylexjs/stylex";
import { type MouseEventHandler, type Ref, lazy } from "react";

import { backgroundColor } from "../../colors.stylex";
import { useCurrentId } from "../../hooks";
import { Orientation } from "../../types";
import { ActionList, type ActionListProps } from "../ActionList";
import { Heading, type HeadingProps } from "../Heading";
import { View } from "../View";

const PaneHeaderInput = lazy(() => import("./PaneHeaderInput"));

export type PaneHeaderProps = {
  actions?: ActionListProps["actions"];
  actionsDense?: ActionListProps["actionsDense"];
  actionsGap?: ActionListProps["gap"];
  actionsHidden?: ActionListProps["hidden"];
  actionsMargin?: ActionListProps["margin"];
  actionsPadding?: ActionListProps["padding"];
  actionsScale?: ActionListProps["actionsScale"];
  actionsStyle?: ActionListProps["style"];
  headingPadding?: HeadingProps["padding"];
  headingStyle?: HeadingProps["style"];
  id?: string;
  inputRef?: Ref<HTMLInputElement>;
  level?: HeadingProps["level"];
  onTitleEditClick?: MouseEventHandler<HTMLButtonElement>;
  onTitleSaveClick?: MouseEventHandler<HTMLButtonElement>;
  outer?: boolean;
  ref?: Ref<HTMLHeadingElement>;
  title?: string;
  titleEditable?: boolean;
  titleEditing?: boolean;
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
    maxHeight: "2.5rem",
    minHeight: "2.5rem",
  },
  heading: {
    fontSize: "1.125rem",
    textOverflow: "ellipsis",
    textWrap: "nowrap",
  },
  headingWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    gap: "0.25rem",
    paddingInline: "0.25rem",
  },
  inner: {
    borderStartEndRadius: "0.25rem",
    borderStartStartRadius: "0.25rem",
  },
});

const PaneHeader = ({
  actions,
  actionsDense = true,
  actionsGap = 0.5,
  actionsHidden,
  actionsMargin = 0,
  actionsPadding = {
    block: 0.25,
    inline: 0.5,
  },
  actionsScale = true,
  actionsStyle,
  headingPadding = {
    inline: 0.5,
  },
  headingStyle,
  id,
  inputRef,
  level = 2,
  onTitleEditClick,
  onTitleSaveClick,
  outer,
  ref,
  title,
  titleEditable,
  titleEditing,
}: PaneHeaderProps) => {
  const currentId = useCurrentId(id);

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
            headingStyle,
          ]}
        >
          {title}
        </Heading>
        {titleEditable && (
          <PaneHeaderInput
            defaultValue={title}
            editing={titleEditing}
            id={`${currentId}-heading-input`}
            onEditClick={onTitleEditClick}
            onSaveClick={onTitleSaveClick}
            ref={inputRef}
            style={styles.heading}
          />
        )}
      </span>
      <ActionList
        actions={actions}
        actionsDense={actionsDense}
        actionsScale={actionsScale}
        gap={actionsGap}
        hidden={actionsHidden}
        id={`${currentId}-toolbar`}
        margin={actionsMargin}
        orientation={Orientation.Horizontal}
        padding={actionsPadding}
        style={actionsStyle}
      />
    </View>
  );
};

export default PaneHeader;
