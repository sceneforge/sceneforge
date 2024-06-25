import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren } from "react";

import { Variant } from "../../types";
import { Action, type ActionProps } from "../Action";
import { backgroundColor, color } from "../tokens.stylex";

export type CardProps = PropsWithChildren<{
  actions?: ActionProps[];
  img?: string;
  title?: string;
  variant?: Variant;
  zoom?: 0 | 1 | 2 | 3 | 4;
}>;

const styles = stylex.create({
  actions: {
    color: "inherit",
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    justifyContent: "stretch",
    padding: "0.75rem",
  },
  children: {
    backgroundColor: "color-mix(in srgb, ButtonFace 50%, transparent)",
    color: "inherit",
    width: "100%",
  },
  colorVariant: (
    background: keyof typeof color,
    percent: number,
    text?: keyof typeof color
  ) => ({
    backgroundColor: `color-mix(in srgb, ${String(color[background])} ${percent}%, transparent)`,
    color: text ? color[text] : color.foreground,
  }),
  container: {
    backgroundColor: "Canvas",
    borderRadius: "0.5rem",
    color: "CanvasText",
    height: "100%",
    overflow: "clip",
    position: "relative",
    textAlign: "start",
    width: "100%",
  },
  image: {
    display: "block",
    position: "absolute",
  },
  imageContainer: {
    "::after": {
      content: "''",
      display: "block",
      paddingBlockEnd: "80%",
    },
    "backgroundColor": backgroundColor.alpha20,
    "borderEndEndRadius": "0.5rem",
    "borderEndStartRadius": "0.5rem",
    "overflow": "clip",
    "position": "relative",
  },
  imageZoom0: {
    marginBlock: 0,
    marginInline: 0,
    maxWidth: "100%",
    width: "100%",
  },
  imageZoom1: {
    marginBlock: "-10%",
    marginInline: "-25%",
    maxWidth: "150%",
    width: "150%",
  },
  imageZoom2: {
    marginBlock: "-20%",
    marginInline: "-50%",
    maxWidth: "200%",
    width: "200%",
  },
  imageZoom3: {
    marginBlock: "-30%",
    marginInline: "-75%",
    maxWidth: "250%",
    width: "250%",
  },
  imageZoom4: {
    marginBlock: "-40%",
    marginInline: "-100%",
    maxWidth: "300%",
    width: "300%",
  },
  title: {
    backgroundColor: "ButtonFace",
    color: "ButtonText",
    display: "block",
    fontSize: "0.85rem",
    paddingBlock: "0.5rem",
    paddingInline: "1rem",
    textAlign: "start",
  },
});

const Card = ({
  actions,
  children,
  img,
  title,
  variant,
  zoom = 0,
}: CardProps) => {
  return (
    <div {...stylex.props(styles.container)}>
      {title && (
        <span
          {...stylex.props(
            styles.title,
            variant === Variant.Accent && styles.colorVariant("accent", 75, "accentText"),
            variant === Variant.Default && styles.colorVariant("primary", 75, "primaryText"),
            variant === Variant.Danger && styles.colorVariant("danger", 75, "dangerText"),
            variant === Variant.Info && styles.colorVariant("info", 75, "infoText"),
            variant === Variant.Success && styles.colorVariant("success", 75, "successText"),
            variant === Variant.Warning && styles.colorVariant("warning", 75, "warningText")
          )}
        >
          {title}
        </span>
      )}
      {img && (
        <div
          {...stylex.props(
            styles.colorVariant("foreground", 35, "background"),
            variant === Variant.Accent && styles.colorVariant("accent", 35),
            variant === Variant.Default && styles.colorVariant("primary", 35),
            variant === Variant.Danger && styles.colorVariant("danger", 35),
            variant === Variant.Info && styles.colorVariant("info", 35),
            variant === Variant.Success && styles.colorVariant("success", 35),
            variant === Variant.Warning && styles.colorVariant("warning", 35)
          )}
        >
          <div {...stylex.props(styles.imageContainer)}>
            <img
              alt={`Image of ${title}`}
              src={img}
              {...stylex.props(styles.image, styles[`imageZoom${zoom}`])}
            />
          </div>
        </div>
      )}
      {children && (
        <div
          {...stylex.props(
            styles.children,
            variant === Variant.Accent && styles.colorVariant("accent", 25),
            variant === Variant.Default && styles.colorVariant("primary", 25),
            variant === Variant.Danger && styles.colorVariant("danger", 25),
            variant === Variant.Info && styles.colorVariant("info", 25),
            variant === Variant.Success && styles.colorVariant("success", 25),
            variant === Variant.Warning && styles.colorVariant("warning", 25)
          )}
        >
          {children}
        </div>
      )}
      {actions && actions.length > 0 && (
        <div
          {...stylex.props(
            styles.actions,
            styles.colorVariant("foreground", 35, "background"),
            variant === Variant.Accent && styles.colorVariant("accent", 35),
            variant === Variant.Default && styles.colorVariant("primary", 35),
            variant === Variant.Danger && styles.colorVariant("danger", 35),
            variant === Variant.Info && styles.colorVariant("info", 35),
            variant === Variant.Success && styles.colorVariant("success", 35),
            variant === Variant.Warning && styles.colorVariant("warning", 35)
          )}
        >
          {actions.map((props, index) => (
            <Action key={index} {...props} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
