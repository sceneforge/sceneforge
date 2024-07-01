import * as stylex from "@stylexjs/stylex";
import { Children, Fragment, useId } from "react";

import { Orientation } from "../../types";
import { View, type ViewProps } from "../View";

export type SplitPaneProps = {
  initialSize?: number[];
  orientation?: Orientation;
  resizable?: boolean;
} & ViewProps;

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
    display: "flex",
    flexWrap: "nowrap",
    height: "100%",
    justifyContent: "stretch",
    overflow: "hidden",
    width: "100%",
  },
  containerHorizontal: {
    flexDirection: "row",
  },
  containerVertical: {
    flexDirection: "column",
  },
  paneGutter: {
    backgroundColor: {
      ":hover": "color-mix(in srgb, currentColor 50%, transparent)",
      "default": "transparent",
    },
    boxShadow: {
      ":hover": "0 0 0 0.125rem color-mix(in srgb, currentColor 50%, transparent)",
      "default": null,
    },
    cursor: "col-resize",
    flexShrink: 1,
    height: "100%",
    transition: "box-shadow 0.2s ease-in-out",
    width: "0.25rem",
  },
  paneGutterVertical: {
    cursor: "row-resize",
    height: "0.25rem",
    width: "100%",
  },
});

const SplitPane = ({
  children,
  id,
  initialSize,
  orientation = Orientation.Horizontal,
  ref,
  resizable = false,
  ...props
}: SplitPaneProps) => {
  const generatedId = useId();
  const currentId = id || generatedId;
  const originalSize = 100 / Children.count(children);
  return (
    <View
      {...props}
      id={currentId}
      ref={ref}
      style={[
        styles.container,
        orientation === Orientation.Horizontal
          ? styles.containerHorizontal
          : styles.containerVertical,
      ]}
    >
      {Children.map(children, (child, index) => (
        <Fragment key={index}>
          <div
            id={`${currentId}-pane-${index}`}
            {...stylex.props(
              styles.childrenWrapper,
              styles.childrenWrapperSize(
                orientation,
                (initialSize && initialSize[index] !== undefined)
                  ? initialSize[index]
                  : originalSize
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
            </span>
          )}
        </Fragment>
      ))}
    </View>
  );
};

export default SplitPane;
