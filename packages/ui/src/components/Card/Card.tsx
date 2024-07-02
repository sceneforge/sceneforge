import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren } from "react";

import { Variant } from "../../types";
import { type ActionProps } from "../Action";
import { Pane } from "../Pane";
import { View } from "../View";

export type CardProps = PropsWithChildren<{
  actions?: ActionProps[];
  id?: string;
  img?: string;
  label?: string;
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
  children,
  id,
  img,
  label,
  style,
  variant,
}: CardProps) => {
  return (
    <View
      id={id}
      style={[
        styles.container,
        style,
      ]}
      variant={variant}
    >
      <Pane
        headingPadding={{
          inline: 0.5,
        }}
        level={3}
        outer
        paneActions={actions}
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
