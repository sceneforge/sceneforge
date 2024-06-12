import * as stylex from "@stylexjs/stylex";
import { Children, Fragment, type Ref, type PropsWithChildren, useId } from "react"
import { Orientation, IconEnum } from "../../types"
import { Icon } from "../Icon";

export type SplitPaneProps = PropsWithChildren<{
  id?: string;
  orientation?: Orientation;
  resizable?: boolean;
  ref?: Ref<HTMLDivElement>;
}>

const styles = stylex.create({
  container: {
    display: "flex",
    margin: 0,
    padding: 0,
    gap: 0,
    flexWrap: "nowrap",
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    justifyContent: "stretch",
    alignItems: "center",
    overflow: "hidden",
    color: "inherit",
  },
  containerHorizontal: {
    flexDirection: "row",
  },
  containerVertical: {
    flexDirection: "column",
  },
  gutterIcon: {
    color: "inherit",
    pointerEvents: "none",
    touchAction: "none",
  },
  gutterIconVertical: {
    transform: "rotate(90deg)",
  },
  childrenWrapper: {
    display: "block",
    flexGrow: 1,
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
  childrenWrapperSize: (orientation: Orientation, size: number) => ({
    width: orientation === Orientation.Horizontal ? `${size}%` : "100%",
    height: orientation === Orientation.Vertical ? `${size}%` : "100%",
  }),
  paneGutter: {
    margin: 0,
    padding: 0,
    border: "none",
    flexShrink: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "inherit",
    opacity: 0.25,
    ":hover": {
      opacity: 0.75,
    },
    width: null,
    minWidth: null,
    height: "100%",
    minHeight: "3.75rem",
    cursor: "col-resize",
  },
  paneGutterVertical: {
    width: "100%",
    minWidth: "3.75rem",
    height: null,
    minHeight: null,
    cursor: "row-resize",
  }
});

const SplitPane = ({
  id,
  orientation = Orientation.Horizontal,
  children,
  resizable = false,
  ref,
}: SplitPaneProps) => {
  const generatedId = useId();
  const currentId = id || generatedId;
  return (
    <div
      ref={ref}
      id={currentId}
      {...stylex.props(styles.container, orientation === Orientation.Horizontal ? styles.containerHorizontal : styles.containerVertical)}
    >
      {Children.map(children, (child, index) => (
        <Fragment key={index}>
          <div
            id={`${currentId}-pane-${index}`}
            {...stylex.props(styles.childrenWrapper, styles.childrenWrapperSize(orientation, 100 / Children.count(children)))}
          >
            {child}
          </div>
          {resizable && index < Children.count(children) - 1 && (
            <span
              id={`${currentId}-resizer-${index}-${index + 1}`}
              aria-label={orientation === Orientation.Horizontal ? "Resize columns" : "Resize rows"}
              role="separator"
              aria-orientation={orientation === Orientation.Horizontal ? "vertical" : "horizontal"}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={100 / Children.count(children)}
              data-resize-id-start={`${currentId}-pane-${index}`}
              data-resize-id-end={`${currentId}-pane-${index + 1}`}
              {...stylex.props(styles.paneGutter, orientation === Orientation.Vertical && styles.paneGutterVertical)}
            >
              <Icon
                role="presentation"
                icon={IconEnum.DragIndicator}
                size={3}
                style={[styles.gutterIcon, orientation === Orientation.Vertical && styles.gutterIconVertical]}
              />
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default SplitPane;
