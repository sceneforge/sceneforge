import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";

import { Image, type ImageProps } from "../Image";

export type FigureProps = {
  caption?: string;
  style?: StyleXStyles;
} & Omit<ImageProps, "style">;

const styles = stylex.create({
  container: {
    display: "block",
    maxWidth: "100%",
  },
});

const Figure = ({
  caption,
  style,
  title,
  ...props
}: FigureProps) => {
  return (
    <figure
      {...stylex.props(
        styles.container,
        style
      )}
    >
      <Image {...props} title={title} />
      <figcaption>
        {caption || title}
      </figcaption>
    </figure>
  );
};

export default Figure;
