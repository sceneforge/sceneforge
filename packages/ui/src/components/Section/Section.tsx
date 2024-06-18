import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import {
  type HTMLAttributes,
  type PropsWithChildren,
  type Ref,
} from "react";

import { Heading } from "../Heading";
import { color } from "../tokens.stylex";

const styles = stylex.create({
  container: {
    color: color.background,
    textAlign: "start",
  },
  content: {
    color: "inherit",
    marginInline: "auto",
    width: "100%",
  },
  heading: {
    color: "inherit",
    marginBlockEnd: "4rem",
    marginBlockStart: 0,
    marginInline: "auto",
    textAlign: "start",
    textShadow: `1px 1px 3px ${color.foreground}, 2px 4px 7px ${color.foreground}`,
    width: "100%",
  },
});

export type SectionProps = Omit<HTMLAttributes<HTMLElement>, "style"> &
  PropsWithChildren<{
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    ref?: Ref<HTMLElement>;
    style?: StyleXStyles;
    title?: string;
  }>;

const Section = ({
  children,
  level = 2,
  ref,
  style,
  title,
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
