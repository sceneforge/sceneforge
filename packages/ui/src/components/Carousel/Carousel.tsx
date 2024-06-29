import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type ReactNode, useId } from "react";

import { Variant } from "../../types";
import { Section, type SectionProps } from "../Section";
import { View } from "../View";
import { type SpacerStyleProps } from "../tokens.stylex";

export type CarouselProps = {
  division?: number;
  gap?: number;
  id?: string;
  items?: ReactNode[];
  level?: SectionProps["level"];
  padding: SpacerStyleProps;
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
    scrollSnapAlign: "start",
    zIndex: {
      ":focus-within": 1,
      ":hover": 1,
      "default": -1,
    },
  },
  scrollPaddingInline: (value: number) => ({
    scrollPaddingInline: value > 0 ? `${value}rem` : null,
  }),
  scroller: {
    display: "grid",
    gridAutoFlow: "column",
    isolation: "isolate",
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
  padding = {
    block: 1,
    blockEnd: 1.5,
    inline: 1,
  },
  shadow = true,
  style,
  title,
  variant,
}: CarouselProps) => {
  const generatedId = useId();
  const currentId = id || generatedId;
  const paddingInline = typeof padding === "object" ? padding.inline : padding;

  return (
    <Section
      headingPadding={{
        inline: paddingInline,
      }}
      level={level}
      shadow={shadow}
      title={title}
      variant={variant}
    >
      <View
        padding={padding}
        style={[
          styles.scroller as Record<string, string>,
          typeof paddingInline === "number" && styles.scrollPaddingInline(paddingInline),
          styles.gap(gap),
          typeof division === "number" && styles.division(division),
          style,
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
    </Section>
  );
};

export default Carousel;
