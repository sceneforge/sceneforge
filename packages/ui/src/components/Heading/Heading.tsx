import * as stylex from "@stylexjs/stylex";
import { type HTMLAttributes, createElement } from "react";

export type HeadingProps = Omit<HTMLAttributes<HTMLHeadingElement>, "style" | "className"> & {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  style?: stylex.StyleXStyles;
}

const styles = stylex.create({
  container: {
    margin: 0,
    padding: 0,
  },
});

const Heading = ({ level, style, ...props }: HeadingProps) =>
  createElement(`h${level}`, {
    ...stylex.props(styles.container, style),
    ...props,
  });

export default Heading;
