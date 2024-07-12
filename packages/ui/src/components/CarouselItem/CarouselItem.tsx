import * as stylex from "@stylexjs/stylex";

import { Card, type CardProps } from "../Card";
import { CardButton, type CardButtonProps } from "../CardButton";
import { IconButton, type IconButtonProps } from "../IconButton";
import { View, ViewProps } from "../View";

type CarouselItemCardButtonProps = {
  dense?: never;
  description?: string;
  glossy?: never;
  icon?: never;
  inverted?: never;
  kind: "button";
  scale?: never;
  size?: never;
} & Omit<CardButtonProps, "children">;

type CarouselItemCardProps = {
  dense?: never;
  description?: string;
  glossy?: never;
  icon?: never;
  inverted?: never;
  kind: "card";
  onClick?: never;
  scale?: never;
  size?: never;
} & Omit<CardProps, "children">;

type CarouselItemIconButtonProps = {
  description?: never;
  img?: never;
  kind: "icon";
  zoom?: never;
} & IconButtonProps;

type CarouselAllItemsProps =
  | CarouselItemCardButtonProps
  | CarouselItemCardProps
  | CarouselItemIconButtonProps;

export type CarouselItemProps = {
  hidden?: ViewProps["hidden"];
} & Omit<CarouselAllItemsProps, "hidden">;

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
  hidden,
  kind,
  ...props
}: CarouselItemProps) => {
  return (
    <View
      hidden={hidden}
      style={styles.container}
    >
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
