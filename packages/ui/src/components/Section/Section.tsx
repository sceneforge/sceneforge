import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import {
  type HTMLAttributes,
  type PropsWithChildren,
  type Ref,
} from "react";

import { colorStyles } from "../../colors.stylex";
import { Variant } from "../../types";
import { Heading, type HeadingProps } from "../Heading";
import { marginStyle, paddingStyle, type SpacerStyleProps } from "../tokens.stylex";

const styles = stylex.create({
  container: {
    margin: 0,
    padding: 0,
    textAlign: "start",
  },
  heading: {
    display: "block",
    marginBlock: 0,
    marginInline: "auto",
    padding: 0,
    textAlign: "start",
    width: "100%",
  },
  hidden: {
    display: "none",
  },
});

export type SectionProps = Omit<HTMLAttributes<HTMLElement>, "style"> &
  PropsWithChildren<{
    headingPadding?: HeadingProps["padding"];
    hidden?: boolean;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    margin?: SpacerStyleProps;
    padding?: SpacerStyleProps;
    ref?: Ref<HTMLElement>;
    shadow?: boolean;
    style?: StyleXStyles;
    title?: string;
    variant?: Variant;
  }>;

const Section = ({
  children,
  headingPadding,
  hidden,
  level = 2,
  margin,
  padding,
  ref,
  shadow,
  style,
  title,
  variant,
}: SectionProps) => {
  return (
    <section
      ref={ref}
      {...stylex.props(
        styles.container,
        ...(margin === undefined ? [] : marginStyle(margin)),
        ...(padding === undefined ? [] : paddingStyle(padding)),
        variant && colorStyles.variant(variant),
        hidden && styles.hidden
      )}
    >
      {title && (
        <Heading
          inverted={variant ? true : false}
          level={level}
          padding={headingPadding}
          shadow={shadow}
          style={[
            styles.heading,
            style,
          ]}
          variant={variant}
        >
          {title}
        </Heading>
      )}
      {children && (children)}
    </section>
  );
};

export default Section;
