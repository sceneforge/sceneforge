import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";

import { borderStyles, roundedStyles } from "../../borders.stylex";
import { backgroundStyles, foregroundColor, textColorStyles, textShadowStyles } from "../../colors.stylex";
import { Shape } from "../../types";
import { Image, type ImageProps } from "../Image";

export type FigureProps = {
  caption?: string;
  frame?: boolean;
  inset?: boolean;
  style?: StyleXStyles;
} & Omit<ImageProps, "style">;

const styles = stylex.create({
  caption: {
    fontSize: "0.875rem",
    textAlign: "center",
  },
  captionBasicShapeInset: {
    backgroundImage: `linear-gradient(to bottom, transparent, ${foregroundColor.alpha25} 45%, ${foregroundColor.alpha15} 85%)`,
    fontSize: "clamp(1rem, 1.2vw, 2.5rem)",
    insetBlock: null,
    insetBlockEnd: 0,
    paddingBlockEnd: "0.5rem",
    paddingBlockStart: "0.25rem",
    paddingInline: "0.25rem",
  },
  captionInset: {
    alignContent: "center",
    fontSize: "clamp(1rem, 2vw, 2.5rem)",
    fontWeight: 500,
    insetBlock: 0,
    insetInline: 0,
    position: "absolute",
  },
  container: {
    padding: "0.5rem",
  },
  containerInset: {
    overflow: "clip",
    padding: 0,
    position: "relative",
  },
});

const Figure = ({
  caption,
  frame,
  inset,
  shape,
  style,
  title,
  ...props
}: FigureProps) => {
  return (
    <figure
      {...stylex.props(
        styles.container,
        (
          shape !== Shape.Circle
          && shape !== Shape.Pill
          && shape !== Shape.Squircle
        )
        && [
          frame && !inset && backgroundStyles.default(100),
          frame && !inset && borderStyles.border,
          frame && !inset && borderStyles.borderSize(1),
          frame && !inset && borderStyles.borderDefault(15),
          shape !== Shape.Rectangle
          && roundedStyles.rounded(shape === Shape.Rounded ? 4 : 2),
        ],
        inset && styles.containerInset,
        style
      )}
    >
      <Image
        {...props}
        shape={shape}
        style={
          !shape && roundedStyles.rounded(1)
        }
        title={title}
      />
      <figcaption
        {...stylex.props(
          styles.caption,
          inset && styles.captionInset,
          (
            shape !== Shape.Circle
            && shape !== Shape.Pill
            && shape !== Shape.Squircle
          )
          && [
            inset && styles.captionBasicShapeInset,
          ],
          inset && textColorStyles.default,
          inset && textShadowStyles.default(0.5)
        )}
      >
        {caption || title}
      </figcaption>
    </figure>
  );
};

export default Figure;
