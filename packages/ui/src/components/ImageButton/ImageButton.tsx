import * as stylex from "@stylexjs/stylex";

import { Button, type ButtonProps } from "../Button";
import { Image, type ImageProps } from "../Image";

export type ImageButtonProps = {
  alt?: ImageProps["alt"];
  src: ImageProps["src"];
  title?: ImageProps["title"];
} & Omit<ButtonProps, "children" | "dense" | "glossy" | "padding" | "variant">;

const styles = stylex.create({
  container: {
    overflow: "clip",
  },
  image: {
    height: "100%",
    objectFit: "cover",
  },
});

const ImageButton = ({
  alt,
  label,
  src,
  style,
  title,
  ...props
}: ImageButtonProps) => {
  return (
    <Button
      label={label || title}
      margin={0}
      padding={0}
      {...props}
      style={[
        styles.container,
        style,
      ]}
    >
      <Image
        alt={alt}
        src={src}
        style={styles.image}
        title={title || label}
      />
    </Button>
  );
};

export default ImageButton;
