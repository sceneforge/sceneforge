import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren } from "react";

import { Variant } from "../../types";
import { Pane, type PaneProps } from "../Pane";
import { View, ViewProps } from "../View";

export type CardProps = PropsWithChildren<{
  actions?: PaneProps["paneActions"];
  actionsGap?: PaneProps["paneActionsGap"];
  actionsMargin?: PaneProps["paneActionsMargin"];
  actionsPadding?: PaneProps["paneActionsPadding"];
  actionsStyle?: PaneProps["paneActionsStyle"];
  hidden?: ViewProps["hidden"];
  id?: string;
  img?: string;
  label?: string;
  popover?: ViewProps["popover"];
  style?: StyleXStyles;
  variant?: Variant;
}>;

const styles = stylex.create({
  container: {
    borderRadius: "0.5rem",
    position: "relative",
    textAlign: "start",
  },
  image: {
    aspectRatio: "4 / 3",
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
});

const Card = ({
  actions,
  actionsGap,
  actionsMargin,
  actionsPadding,
  actionsStyle,
  children,
  hidden,
  id,
  img,
  label,
  popover,
  style,
  variant,
}: CardProps) => {
  return (
    <View
      hidden={hidden}
      id={id}
      popover={popover}
      style={[
        styles.container,
        style,
      ]}
      variant={variant}
    >
      <Pane
        level={3}
        outer
        paneActions={actions}
        paneActionsGap={actionsGap}
        paneActionsMargin={actionsMargin}
        paneActionsPadding={actionsPadding}
        paneActionsStyle={actionsStyle}
        title={label}
      >
        {img && (
          <img
            alt={`Image of ${label}`}
            src={img}
            {...stylex.props(
              styles.image
            )}
          />
        )}
        {children}
      </Pane>
    </View>
  );
};

export default Card;
