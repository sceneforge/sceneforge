import * as stylex from "@stylexjs/stylex";

import { Image, ImageProps } from "../Image";

export type PaneImageProps = ImageProps;

const styles = stylex.create({
  container: {
    aspectRatio: "4 / 3",
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
});

const PaneImage = ({ style, ...props }: PaneImageProps) => {
  return (
    <Image
      {...props}
      style={[
        styles.container,
        style,
      ]}
    />
  );
};

export default PaneImage;
