import type { StyleXStyles } from "@stylexjs/stylex";
import type {
  CanvasHTMLAttributes,
  DetailedHTMLProps,
  Ref,
} from "react";

import * as stylex from "@stylexjs/stylex";

export type CanvasProps = {
  ref?: Ref<HTMLCanvasElement>;
  style?: StyleXStyles;
} & Omit<DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>, "style">;

const styles = stylex.create({
  container: {
    height: "100%",
    touchAction: "none",
    width: "100%",
  },
});

const Canvas = ({ ref, style, ...props }: CanvasProps) => {
  return (
    <canvas
      {...props}
      {...stylex.props(styles.container, style)}
      ref={ref}
    />
  );
};

export default Canvas;
