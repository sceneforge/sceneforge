import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren, lazy } from "react";

import type { PaneBodyProps } from "./PaneBody";
import type { PaneHeaderProps } from "./PaneHeader";

import { backgroundColor } from "../tokens.stylex";
import { usePane } from "./usePane";

const PaneHeader = lazy(() => import("./PaneHeader"));
const PaneBody = lazy(() => import("./PaneBody"));

export type PaneProps = Omit<
  PaneHeaderProps,
  | "inputRef"
  | "onTitleEditClick"
  | "onTitleSaveClick"
  | "ref"
  | "titleEditing"
> & PropsWithChildren<{
  onTitleChange?: (currentTitle?: string, previousTitle?: string) => void;
  paneActions?: PaneBodyProps["actions"];
  paneActionsDense?: PaneBodyProps["actionsDense"];
  paneActionsGap?: PaneBodyProps["actionsGap"];
  paneActionsHidden?: PaneBodyProps["actionsHidden"];
  paneActionsMargin?: PaneBodyProps["actionsMargin"];
  paneActionsPadding?: PaneBodyProps["actionsPadding"];
  paneActionsScale?: PaneBodyProps["actionsScale"];
  paneActionsStyle?: PaneBodyProps["actionsStyle"];
}>;

const styles = stylex.create({
  container: {
    backgroundColor: backgroundColor.alpha10,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  inner: {
    borderColor: backgroundColor.alpha10,
    borderRadius: "0.5rem",
    borderStyle: "solid",
    borderWidth: "1px",
    padding: "0.25rem",
  },
});

const Pane = ({
  children,
  level,
  onTitleChange,
  outer,
  paneActions,
  paneActionsDense,
  paneActionsGap,
  paneActionsHidden,
  paneActionsMargin,
  paneActionsPadding,
  paneActionsScale,
  paneActionsStyle,
  title,
  ...props
}: PaneProps) => {
  const {
    currentTitle,
    currentTitleEditing,
    handleTitleEditClick,
    handleTitleSaveClick,
    headingRef,
    inputRef,
  } = usePane({
    onTitleChange,
    title,
  });

  return (
    <section
      {...stylex.props(
        styles.container,
        !outer && styles.inner
      )}
    >
      {title
        ? (
          <>
            <PaneHeader
              level={level}
              onTitleEditClick={handleTitleEditClick}
              onTitleSaveClick={handleTitleSaveClick}
              outer={outer}
              title={currentTitle}
              titleEditing={currentTitleEditing}
              {...props}
              inputRef={inputRef}
              ref={headingRef}
            />
            <PaneBody
              actions={paneActions}
              actionsDense={paneActionsDense}
              actionsGap={paneActionsGap}
              actionsHidden={paneActionsHidden}
              actionsMargin={paneActionsMargin}
              actionsPadding={paneActionsPadding}
              actionsScale={paneActionsScale}
              actionsStyle={paneActionsStyle}
            >
              {children}
            </PaneBody>
          </>
        )
        : children}
    </section>
  );
};

export default Pane;
