import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";

export type PaneImageProps = {
  alt?: string;
  src: string;
  style?: StyleXStyles;
};

const styles = stylex.create({
  container: {
    aspectRatio: "4 / 3",
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
});

const PaneImage = ({ alt, src }: PaneImageProps) => {
  return (
    <img
      alt={alt}
      src={src}
      {...stylex.props(styles.container)}
    />
  );
};

export default PaneImage;
