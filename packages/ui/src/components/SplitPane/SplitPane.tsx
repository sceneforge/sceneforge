import * as stylex from "@stylexjs/stylex";
import { Children, Fragment, useId } from "react";

import { backgroundColor } from "../../colors.stylex";
import { Orientation } from "../../types";
import { View, type ViewProps } from "../View";

export type SplitPaneProps = {
  initialSize?: number[];
  orientation?: Orientation;
  resizable?: boolean;
} & ViewProps;

const styles = stylex.create({
  childrenWrapper: {
    flexGrow: 1,
  },
  childrenWrapperSize: (orientation: Orientation, size: number) => ({
    height: orientation === Orientation.Vertical ? `${size}%` : "100%",
    width: orientation === Orientation.Horizontal ? `${size}%` : "100%",
  }),
  container: {
    alignItems: "center",
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "stretch",
  },
  containerHorizontal: {
    flexDirection: "row",
  },
  containerVertical: {
    flexDirection: "column",
  },
  paneGutter: {
    backgroundColor: {
      ":hover": backgroundColor.alpha30,
      "default": backgroundColor.alpha05,
    },
    boxShadow: {
      ":hover": `0 0 0 0.125rem ${backgroundColor.alpha30}`,
      "default": null,
    },
    cursor: "col-resize",
    flexShrink: 1,
    height: "100%",
    transition: "box-shadow 0.1s, background-color 0.2s",
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
          <View
            id={`${currentId}-pane-${index}`}
            scrollable
            style={[
              styles.childrenWrapper,
              styles.childrenWrapperSize(
                orientation,
                (initialSize && initialSize[index] !== undefined)
                  ? initialSize[index]
                  : originalSize
              ),
            ]}
          >
            {child}
          </View>
          {resizable && index < Children.count(children) - 1 && (
            <View
              aria-label={orientation === Orientation.Horizontal ? "Resize columns" : "Resize rows"}
              aria-orientation={orientation === Orientation.Horizontal ? "vertical" : "horizontal"}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={100 / Children.count(children)}
              data-resize-id-end={`${currentId}-pane-${index + 1}`}
              data-resize-id-start={`${currentId}-pane-${index}`}
              id={`${currentId}-resizer-${index}-${index + 1}`}
              role="separator"
              style={[
                styles.paneGutter,
                orientation === Orientation.Vertical
                && styles.paneGutterVertical,
              ]}
            >
            </View>
          )}
        </Fragment>
      ))}
    </View>
  );
};

export default SplitPane;
