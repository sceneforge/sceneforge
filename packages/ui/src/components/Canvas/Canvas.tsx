import type { StyleXStyles } from "@stylexjs/stylex";
import type {
  CanvasHTMLAttributes,
  DetailedHTMLProps,
} from "react";

import * as stylex from "@stylexjs/stylex";

export type CanvasProps = {
  style?: StyleXStyles;
} & Omit<DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>, "style">;

const styles = stylex.create({
  container: {
    height: "100%",
    touchAction: "none",
    width: "100%",
  },
});

const Canvas = ({ style, ...props }: CanvasProps) => {
  return (
    <canvas {...props} {...stylex.props(styles.container, style)} />
  );
};

export default Canvas;
