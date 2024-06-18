import * as stylex from "@stylexjs/stylex";
import { Children, Fragment, type PropsWithChildren, type Ref, useId } from "react";

import { IconEnum, Orientation } from "../../types";
import { Icon } from "../Icon";

export type SplitPaneProps = PropsWithChildren<{
  id?: string;
  orientation?: Orientation;
  ref?: Ref<HTMLDivElement>;
  resizable?: boolean;
}>;

const styles = stylex.create({
  childrenWrapper: {
    boxSizing: "border-box",
    display: "block",
    flexGrow: 1,
    height: "100%",
    overflow: "auto",
    width: "100%",
  },
  childrenWrapperSize: (orientation: Orientation, size: number) => ({
    height: orientation === Orientation.Vertical ? `${size}%` : "100%",
    width: orientation === Orientation.Horizontal ? `${size}%` : "100%",
  }),
  container: {
    alignItems: "center",
    boxSizing: "border-box",
    color: "inherit",
    display: "flex",
    flexWrap: "nowrap",
    gap: 0,
    height: "100%",
    justifyContent: "stretch",
    margin: 0,
    overflow: "hidden",
    padding: 0,
    width: "100%",
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
  paneGutter: {
    ":hover": {
      opacity: 0.75,
    },
    "alignItems": "center",
    "border": "none",
    "color": "inherit",
    "cursor": "col-resize",
    "display": "flex",
    "flexShrink": 1,
    "height": "100%",
    "justifyContent": "center",
    "margin": 0,
    "minHeight": "3.75rem",
    "minWidth": null,
    "opacity": 0.25,
    "padding": 0,
    "width": null,
  },
  paneGutterVertical: {
    cursor: "row-resize",
    height: null,
    minHeight: null,
    minWidth: "3.75rem",
    width: "100%",
  },
});

const SplitPane = ({
  children,
  id,
  orientation = Orientation.Horizontal,
  ref,
  resizable = false,
}: SplitPaneProps) => {
  const generatedId = useId();
  const currentId = id || generatedId;
  return (
    <div
      id={currentId}
      ref={ref}
      {...stylex.props(
        styles.container,
        orientation === Orientation.Horizontal
          ? styles.containerHorizontal
          : styles.containerVertical
      )}
    >
      {Children.map(children, (child, index) => (
        <Fragment key={index}>
          <div
            id={`${currentId}-pane-${index}`}
            {...stylex.props(
              styles.childrenWrapper,
              styles.childrenWrapperSize(
                orientation,
                100 / Children.count(children)
              )
            )}
          >
            {child}
          </div>
          {resizable && index < Children.count(children) - 1 && (
            <span
              aria-label={orientation === Orientation.Horizontal ? "Resize columns" : "Resize rows"}
              aria-orientation={orientation === Orientation.Horizontal ? "vertical" : "horizontal"}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={100 / Children.count(children)}
              data-resize-id-end={`${currentId}-pane-${index + 1}`}
              data-resize-id-start={`${currentId}-pane-${index}`}
              id={`${currentId}-resizer-${index}-${index + 1}`}
              role="separator"
              {...stylex.props(
                styles.paneGutter,
                orientation === Orientation.Vertical
                && styles.paneGutterVertical
              )}
            >
              <Icon
                icon={IconEnum.DragIndicator}
                role="presentation"
                size={3}
                style={[
                  styles.gutterIcon,
                  orientation === Orientation.Vertical
                  && styles.gutterIconVertical,
                ]}
              />
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default SplitPane;
