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
    color: "inherit",
    width: "100%",
  },
  container: {
    backgroundColor: color.background,
    borderRadius: "0.5rem",
    color: color.foreground,
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
    display: "block",
    fontSize: "1rem",
    paddingBlock: "0.75rem",
    paddingInline: "1rem",
    textAlign: "start",
  },
  variantColor: (
    background: keyof typeof color,
    percent: number,
    text?: keyof typeof color
  ) => ({
    backgroundColor: `color-mix(in srgb, ${String(color[background])} ${percent}%, transparent)`,
    color: text ? color[text] : color.foreground,
  }),
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
            styles.variantColor("foreground", 75, "background"),
            variant === Variant.Accent && styles.variantColor("accent", 75, "accentText"),
            variant === Variant.Default && styles.variantColor("primary", 75, "primaryText"),
            variant === Variant.Danger && styles.variantColor("danger", 75, "dangerText"),
            variant === Variant.Info && styles.variantColor("info", 75, "infoText"),
            variant === Variant.Success && styles.variantColor("success", 75, "successText"),
            variant === Variant.Warning && styles.variantColor("warning", 75, "warningText")
          )}
        >
          {title}
        </span>
      )}
      {img && (
        <div
          {...stylex.props(
            styles.variantColor("foreground", 35, "background"),
            variant === Variant.Accent && styles.variantColor("accent", 35),
            variant === Variant.Default && styles.variantColor("primary", 35),
            variant === Variant.Danger && styles.variantColor("danger", 35),
            variant === Variant.Info && styles.variantColor("info", 35),
            variant === Variant.Success && styles.variantColor("success", 35),
            variant === Variant.Warning && styles.variantColor("warning", 35)
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
            styles.variantColor("foreground", 25, "foreground"),
            variant === Variant.Accent && styles.variantColor("accent", 25),
            variant === Variant.Default && styles.variantColor("primary", 25),
            variant === Variant.Danger && styles.variantColor("danger", 25),
            variant === Variant.Info && styles.variantColor("info", 25),
            variant === Variant.Success && styles.variantColor("success", 25),
            variant === Variant.Warning && styles.variantColor("warning", 25)
          )}
        >
          {children}
        </div>
      )}
      {actions && actions.length > 0 && (
        <div
          {...stylex.props(
            styles.actions,
            styles.variantColor("foreground", 35, "background"),
            variant === Variant.Accent && styles.variantColor("accent", 35),
            variant === Variant.Default && styles.variantColor("primary", 35),
            variant === Variant.Danger && styles.variantColor("danger", 35),
            variant === Variant.Info && styles.variantColor("info", 35),
            variant === Variant.Success && styles.variantColor("success", 35),
            variant === Variant.Warning && styles.variantColor("warning", 35)
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
