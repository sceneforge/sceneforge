import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren } from "react";
import { Action, type ActionProps } from "../Action";
import { Variant } from "../../types";
import { backgroundColor, color } from "../tokens.stylex";

export type CardProps = PropsWithChildren<{
  actions?: ActionProps[];
  img?: string;
  title?: string;
  variant?: Variant;
  zoom?: 0 | 1 | 2 | 3 | 4;
}>;

const styles = stylex.create({
  container: {
    position: "relative",
    height: "100%",
    width: "100%",
    overflow: "clip",
    borderRadius: "0.5rem",
    backgroundColor: color.background,
    color: color.foreground,
    textAlign: "start",
  },
  variantColor: (background: keyof typeof color, percent: number, text?: keyof typeof color) => ({
    backgroundColor: `color-mix(in srgb, ${String(color[background])} ${percent}%, transparent)`,
    color: text ? color[text] : color.foreground,
  }),
  title: {
    display: "block",
    fontSize: "1rem",
    paddingBlock: "0.75rem",
    paddingInline: "1rem",
    textAlign: "start",
  },
  imageContainer: {
    position: "relative",
    overflow: "clip",
    borderEndStartRadius: "0.5rem",
    borderEndEndRadius: "0.5rem",
    "::after": {
      display: "block",
      content: "''",
      paddingBlockEnd: "80%",
    },
    backgroundColor: backgroundColor.alpha20,
  },
  image: {
    position: "absolute",
    display: "block",
  },
  imageZoom0: {
    width: "100%",
    maxWidth: "100%",
    marginBlock: 0,
    marginInline: 0,
  },
  imageZoom1: {
    width: "150%",
    maxWidth: "150%",
    marginBlock: "-10%",
    marginInline: "-25%",
  },
  imageZoom2: {
    width: "200%",
    maxWidth: "200%",
    marginBlock: "-20%",
    marginInline: "-50%",
  },
  imageZoom3: {
    width: "250%",
    maxWidth: "250%",
    marginBlock: "-30%",
    marginInline: "-75%",
  },
  imageZoom4: {
    width: "300%",
    maxWidth: "300%",
    marginBlock: "-40%",
    marginInline: "-100%",
  },
  children: {
    width: "100%",
    color: "inherit",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "stretch",
    gap: "0.5rem",
    padding: "0.75rem",
    color: "inherit",
  }
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
            variant === Variant.Warning && styles.variantColor("warning", 25),
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
            variant === Variant.Warning && styles.variantColor("warning", 35),
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
