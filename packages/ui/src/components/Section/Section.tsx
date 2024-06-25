import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import {
  type HTMLAttributes,
  type PropsWithChildren,
  type Ref,
} from "react";

import { Variant } from "../../types";
import { Heading, HeadingProps } from "../Heading";
import { backgroundTextColorVariantStyle, color } from "../tokens.stylex";

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
  headingWithShadow: {
    color: color.background,
  },
});

export type SectionProps = Omit<HTMLAttributes<HTMLElement>, "style"> &
  PropsWithChildren<{
    headingPadding?: HeadingProps["padding"];
    headingPaddingBlock?: HeadingProps["paddingBlock"];
    headingPaddingBlockEnd?: HeadingProps["paddingBlockEnd"];
    headingPaddingBlockStart?: HeadingProps["paddingBlockStart"];
    headingPaddingInline?: HeadingProps["paddingInline"];
    headingPaddingInlineEnd?: HeadingProps["paddingInlineEnd"];
    headingPaddingInlineStart?: HeadingProps["paddingInlineStart"];
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    ref?: Ref<HTMLElement>;
    shadow?: boolean;
    style?: StyleXStyles;
    title?: string;
    variant?: Variant;
  }>;

const Section = ({
  children,
  headingPadding,
  headingPaddingBlock,
  headingPaddingBlockEnd,
  headingPaddingBlockStart,
  headingPaddingInline,
  headingPaddingInlineEnd,
  headingPaddingInlineStart,
  level = 2,
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
        ...backgroundTextColorVariantStyle(variant)
      )}
    >
      {title && (
        <Heading
          level={level}
          padding={headingPadding}
          paddingBlock={headingPaddingBlock}
          paddingBlockEnd={headingPaddingBlockEnd}
          paddingBlockStart={headingPaddingBlockStart}
          paddingInline={headingPaddingInline}
          paddingInlineEnd={headingPaddingInlineEnd}
          paddingInlineStart={headingPaddingInlineStart}
          shadow={shadow}
          style={[
            styles.heading,
            shadow && styles.headingWithShadow,
            style,
          ]}
        >
          {title}
        </Heading>
      )}
      {children && (children)}
    </section>
  );
};

export default Section;
