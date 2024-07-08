import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { Variant } from "../../types";
import { CarouselItem, type CarouselItemProps } from "../CarouselItem";
import { Section, type SectionProps } from "../Section";
import { View } from "../View";
import { type SpacerStyleProps, currentColor } from "../tokens.stylex";

export type CarouselProps = {
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
  gap: (value: number) => ({
    gap: value > 0 ? `${value}rem` : 0,
    gridAutoColumns: {
      "@media (min-width: 768px)": value > 0 ? `calc(25% - calc(${value}rem * 1.65))` : "25%",
      "@media (min-width: 992px)": value > 0 ? `calc(20% - calc(${value}rem * 1.75))` : "20%",
      "@media (min-width: 1200px)": value > 0 ? `calc(15% - calc(${value}rem * 2.5))` : "15%",
      "default": value > 0 ? `calc(50% - calc(${value}rem * 1.5))` : "50%",
    },
  }),
  scrollPaddingInline: (value: number) => ({
    scrollPaddingInline: value > 0 ? `${value}rem` : null,
  }),
  scroller: {
    display: "grid",
    gridAutoColumns: "50%",
    gridAutoFlow: "column",
    height: null,
    isolation: "isolate",
    scrollBehavior: "smooth",
    scrollSnapType: "inline proximity",
    scrollbarColor: `${currentColor.alpha35} transparent`,
    scrollbarWidth: "thin",
    touchAction: "pan-x",
    whiteSpace: "nowrap",
  },
});

const Carousel = ({
  gap = 1,
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
