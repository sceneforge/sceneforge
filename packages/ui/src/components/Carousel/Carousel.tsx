import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { Variant } from "../../types";
import { CarouselItem, type CarouselItemProps } from "../CarouselItem";
import { Section, type SectionProps } from "../Section";
import { View } from "../View";
import { type SpacerStyleProps } from "../tokens.stylex";

export type CarouselProps = {
  division?: number;
  gap?: number;
  id?: string;
  items?: CarouselItemProps[];
  itemsVariant?: Variant;
  level?: SectionProps["level"];
  padding?: SpacerStyleProps;
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
  scrollPaddingInline: (value: number) => ({
    scrollPaddingInline: value > 0 ? `${value}rem` : null,
  }),
  scroller: {
    display: "grid",
    gridAutoFlow: "column",
    isolation: "isolate",
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
  itemsVariant,
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
        scrollable="inline"
        style={[
          styles.scroller as Record<string, string>,
          typeof paddingInline === "number" && styles.scrollPaddingInline(paddingInline),
          styles.gap(gap),
          typeof division === "number" && styles.division(division),
          style,
        ]}
      >
        {items && items.map((child, index) => (
          <CarouselItem
            id={`${currentId}-carousel-item-${index}`}
            key={`${currentId}-carousel-item-${index}`}
            variant={itemsVariant ?? variant}
            {...child}
          />
        ))}
      </View>
    </Section>
  );
};

export default Carousel;
