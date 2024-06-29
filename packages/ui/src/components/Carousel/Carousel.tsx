import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type ReactNode, useId } from "react";

import { Variant } from "../../types";
import { Section, type SectionProps } from "../Section";
import { View } from "../View";

export type CarouselProps = {
  division?: number;
  gap?: number;
  id?: string;
  items?: ReactNode[];
  level?: SectionProps["level"];
  paddingBlock?: number;
  paddingBlockEnd?: number;
  paddingBlockStart?: number;
  paddingInline?: number;
  paddingInlineEnd?: number;
  paddingInlineStart?: number;
  shadow?: boolean;
  style?: StyleXStyles;
  title?: SectionProps["title"];
  variant?: Variant;
};

const styles = stylex.create({
  division: (division: number) => ({
    gridAutoColumns: division > 0 ? `calc(100% / ${division})` : "1fr",
  }),
  gap: (value: number) => ({
    gap: value > 0 ? `${value}rem` : 0,
  }),
  item: {
    color: "inherit",
    scrollSnapAlign: "start",
  },
  scrollPaddingInline: (value: number) => ({
    scrollPaddingInline: value > 0 ? `${value}rem` : null,
  }),
  scroller: {
    display: "grid",
    gridAutoFlow: "column",
    margin: 0,
    overflowX: "auto",
    overflowY: "hidden",
    overscrollBehaviorInline: "contain",
    scrollBehavior: "smooth",
    scrollSnapType: "inline proximity",
    touchAction: "pan-x",
    whiteSpace: "nowrap",
  },
});

const Carousel = ({
  division = 3,
  gap = 0.5,
  id,
  items,
  level = 2,
  paddingBlock = 1,
  paddingBlockEnd = 1.5,
  paddingBlockStart,
  paddingInline = 1,
  paddingInlineEnd,
  paddingInlineStart,
  shadow = true,
  style,
  title,
  variant,
}: CarouselProps) => {
  const generatedId = useId();
  const currentId = id || generatedId;

  return (
    <Section
      headingPaddingInline={paddingInline}
      headingPaddingInlineEnd={paddingInlineEnd}
      headingPaddingInlineStart={paddingInlineStart}
      level={level}
      shadow={shadow}
      title={title}
      variant={variant}
    >
      <View
        paddingBlock={paddingBlock}
        paddingBlockEnd={paddingBlockEnd}
        paddingBlockStart={paddingBlockStart}
        paddingInline={paddingInline}
        paddingInlineEnd={paddingInlineEnd}
        paddingInlineStart={paddingInlineStart}
        style={[
          styles.scroller as Record<string, string>,
          styles.scrollPaddingInline(paddingInline),
          styles.gap(gap),
          typeof division === "number" && styles.division(division),
          style,
        ]}
      >
        {items && items.map((child, index) => (
          <View
            key={`${currentId}-item-${index}`}
            marginInline={1}
            style={styles.item}
          >
            {child}
          </View>
        ))}
      </View>
    </Section>
  );
};

export default Carousel;
