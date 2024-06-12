import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

import type {
  CanvasHTMLAttributes,
  DetailedHTMLProps,
} from "react";

export type CanvasProps = Omit<DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>, "style"> & {
  style?: StyleXStyles
};

const styles = stylex.create({
  container: {
    height: "100%",
    width: "100%",
    touchAction: "none",
  },
});

const Canvas = ({ style, ...props }: CanvasProps) => {
  return (
    <canvas {...props} {...stylex.props(styles.container, style)} />
  );
};

export default Canvas;
