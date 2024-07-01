import * as stylex from "@stylexjs/stylex";

import { Card, type CardProps } from "../Card";
import { CardButton, type CardButtonProps } from "../CardButton";
import { IconButton, type IconButtonProps } from "../IconButton";
import { View } from "../View";

type CarouselItemCardButtonProps = {
  description?: string;
  icon?: never;
  kind: "button";
  size?: never;
} & Omit<CardButtonProps, "children">;

type CarouselItemCardProps = {
  description?: string;
  icon?: never;
  kind: "card";
  onClick?: never;
  size?: never;
} & Omit<CardProps, "children">;

type CarouselItemIconButtonProps = {
  description?: never;
  img?: never;
  kind: "icon";
  zoom?: never;
} & IconButtonProps;

export type CarouselItemProps =
  | CarouselItemCardButtonProps
  | CarouselItemCardProps
  | CarouselItemIconButtonProps;

const styles = stylex.create({
  container: {
    display: "grid",
    placeItems: "center",
    scrollSnapAlign: "start",
    zIndex: {
      ":focus-within": 1,
      ":hover": 1,
      "default": -1,
    },
  },
});

const CarouselItem = ({
  description,
  kind,
  ...props
}: CarouselItemProps) => {
  return (
    <View style={styles.container}>
      {kind === "icon" && (
        <IconButton {...props as IconButtonProps} />
      )}
      {kind === "button" && (
        <CardButton {...props as CardButtonProps}>
          {description && (
            <View padding={1}>
              {description}
            </View>
          )}
        </CardButton>
      )}
      {kind === "card" && (
        <Card {...props as CardProps}>
          {description && (
            <View padding={1}>
              {description}
            </View>
          )}
        </Card>
      )}
    </View>
  );
};

export default CarouselItem;
