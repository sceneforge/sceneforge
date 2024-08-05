import * as stylex from "@stylexjs/stylex";

import { useCurrentId } from "../../hooks";
import { Variant } from "../../types";
import { CarouselItem, type CarouselItemProps } from "../CarouselItem";
import { Grid, type GridProps } from "../Grid";
import { Section, type SectionProps } from "../Section";
import { type SpacerStyleProps } from "../tokens.stylex";

export type CarouselProps = {
  gap?: number;
  id?: string;
  items?: CarouselItemProps[];
  itemsVariant?: Variant;
  level?: SectionProps["level"];
  padding?: SpacerStyleProps;
  shadow?: boolean;
  style?: GridProps["style"];
  title?: SectionProps["title"];
  variant?: Variant;
};

const styles = stylex.create({
  scroller: {
    height: null,
    isolation: "isolate",
    scrollBehavior: "smooth",
    scrollSnapType: "inline proximity",
    touchAction: "pan-x",
    whiteSpace: "nowrap",
  },
  scrollPaddingInline: (value: number) => ({
    scrollPaddingInline: value > 0 ? `${value}rem` : null,
  }),
});

const Carousel = ({
  gap = 3,
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
  const currentId = useCurrentId(id);
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
      <Grid
        columnsSize={15}
        gap={gap}
        padding={padding}
        scrollable
        style={[
          styles.scroller as Record<string, string>,
          typeof paddingInline === "number" && styles.scrollPaddingInline(paddingInline),
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
      </Grid>
    </Section>
  );
};

export default Carousel;
