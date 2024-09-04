import * as stylex from "@stylexjs/stylex";

import { Shape, Variant } from "../../types";
import { Button, type ButtonProps } from "../Button";
import { Image } from "../Image";
import { UnlistedItem, type UnlistedItemProps } from "../Unlisted";

export type ListCardProps = {
  description?: string;
  imageAlt?: string;
  imageShape?: Shape;
  imageSrc?: string;
  imageTitle?: string;
  onClick?: ButtonProps["onClick"];
  title: string;
  variant?: Variant;
} & UnlistedItemProps;

const styles = stylex.create({
  button: {
    display: "flex",
    flexDirection: "row",
    gap: "0.75rem",
    height: null,
    width: "100%",
  },
  container: {
    height: null,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "start",
    textAlign: "start",
  },
  image: {
    aspectRatio: 1,
    flexGrow: 0,
    flexShrink: 1,
    height: "5rem",
    width: null,
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
});

const ListCard = ({
  description,
  imageAlt,
  imageShape,
  imageSrc,
  imageTitle,
  onClick,
  style,
  title,
  variant,
  ...props
}: ListCardProps) => {
  return (
    <UnlistedItem {...props} style={[styles.container, style]}>
      <Button
        onClick={onClick}
        padding={{ block: 0.5, inline: imageSrc ? 0.5 : 0.75 }}
        style={styles.button}
        variant={variant}
      >
        {imageSrc && (
          <Image
            alt={imageAlt}
            shape={imageShape}
            src={imageSrc}
            style={styles.image}
            title={imageTitle || title}
          />
        )}
        <div {...stylex.props(styles.content)}>
          <span {...stylex.props(styles.title)}>{title}</span>
          {description && <p>{description}</p>}
        </div>
      </Button>
    </UnlistedItem>
  );
};

export default ListCard;
