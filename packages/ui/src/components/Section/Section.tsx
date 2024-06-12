import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  type Ref,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";

import { Heading } from "../Heading";
import { color } from "../tokens.stylex";

const styles = stylex.create({
  container: {
    textAlign: "start",
    color: color.background,
  },
  heading: {
    width: "100%",
    marginInline: "auto",
    marginBlockStart: 0,
    marginBlockEnd: "4rem",
    color: "inherit",
    textAlign: "start",
    textShadow: `1px 1px 3px ${color.foreground}, 2px 4px 7px ${color.foreground}`,
  },
  content: {
    color: "inherit",
    width: "100%",
    marginInline: "auto",
  }
});

export type SectionProps = Omit<HTMLAttributes<HTMLElement>, "style"> &
  PropsWithChildren<{
    style?: StyleXStyles;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    title?: string;
    ref?: Ref<HTMLElement>;
  }>;

const Section = ({
  children,
  style,
  level = 2,
  title,
  ref
}: SectionProps) => {
  return (
    <section ref={ref} {...stylex.props(styles.container)}>
      {title && (
        <Heading level={level} {...stylex.props(styles.heading, style)}>
          {title}
        </Heading>
      )}
      <div {...stylex.props(styles.container)}>
        {children}
      </div>
    </section>
  );
};

export default Section;
