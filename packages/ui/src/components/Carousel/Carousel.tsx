import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type ReactNode, useId } from "react";

import { Variant } from "../../types";
import { Section, type SectionProps } from "../Section";
import { View } from "../View";

export type CarouselProps = {
  division?: number;
  group?: number;
  id?: string;
  items?: ReactNode[];
  level?: SectionProps["level"];
  style?: StyleXStyles;
  title?: SectionProps["title"];
  variant?: Variant;
};

const styles = stylex.create({
  division: (division: number) => ({
    gridAutoColumns: `calc(100% / ${division})`,
  }),
  grid: {
    display: "grid",
    gap: "0.5rem",
    gridAutoColumns: "calc(100% / 3)",
    gridAutoFlow: "column",
  },
  heading: {
    display: "block",
    paddingInline: "1rem",
  },
  item: {
    color: "inherit",
    scrollSnapAlign: "start",
  },
  scroller: {
    margin: 0,
    overflowX: "auto",
    overflowY: "hidden",
    paddingBlock: "0.5rem",
    paddingBlockEnd: "1rem",
    paddingInline: "1rem",
    scrollBehavior: "smooth",
    scrollPaddingInline: "1rem",
    scrollSnapType: "x proximity",
    whiteSpace: "nowrap",
  },
});

const Carousel = ({
  division = 3,
  id,
  items,
  level = 2,
  style,
  title,
  variant,
}: CarouselProps) => {
  const generatedId = useId();
  const currentId = id || generatedId;

  return (
    <Section
      level={level}
      style={styles.heading}
      title={title}
      variant={variant}
    >
      <View
        style={[
          styles.scroller as Record<string, string>,
          style,
        ]}
      >
        <View
          style={[
            styles.grid,
            division > 0 && styles.division(division),
          ]}
        >
          {items && items.map((child, index) => (
            <View
              key={`${currentId}-item-${index}`}
              style={styles.item}
            >
              {child}
            </View>
          ))}
        </View>
      </View>
    </Section>
  );
};

export default Carousel;
