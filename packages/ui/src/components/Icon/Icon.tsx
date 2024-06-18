import type { StyleXStyles } from "@stylexjs/stylex";
import type { HTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { IconEnum, Variant } from "../../types";
import { color, icons } from "../tokens.stylex";

export type IconProps = {
  icon: IconEnum;
  ref?: Ref<HTMLSpanElement>;
  size?: number;
  style?: StyleXStyles;
  variant?: Variant;
} & Omit<HTMLAttributes<HTMLSpanElement>, "className" | "style">;

const styles = stylex.create({
  container: {
    backgroundColor: "currentColor",
    color: "inherit",
    display: "block",
    height: "1em",
    maskRepeat: "no-repeat",
    maskSize: "100% 100%",
    width: "1em",
  },
  icon: (iconKey: keyof typeof icons) => ({
    mask: `${String(icons[iconKey])} no-repeat`,
  }),
  size: (size: number) => ({
    height: `${0.25 * size}rem`,
    minHeight: `${0.25 * size}rem`,
    minWidth: `${0.25 * size}rem`,
    width: `${0.25 * size}rem`,
  }),
  variantColor: (text: keyof typeof color) => ({
    color: color[text],
  }),
});

const Icon = ({
  icon,
  ref,
  size = 4,
  style,
  variant,
  ...props
}: IconProps) => {
  return (
    <span
      role="img"
      {...props}
      ref={ref}
      {...stylex.props(
        styles.container,
        variant === Variant.Accent && styles.variantColor("accent"),
        variant === Variant.Default && styles.variantColor("primary"),
        variant === Variant.Danger && styles.variantColor("danger"),
        variant === Variant.Info && styles.variantColor("info"),
        variant === Variant.Success && styles.variantColor("success"),
        variant === Variant.Warning && styles.variantColor("warning"),
        icon === IconEnum.Add && styles.icon("add"),
        icon === IconEnum.AddCircle && styles.icon("addCircle"),
        icon === IconEnum.ArrowSelectorTool && styles.icon("arrowSelectorTool"),
        icon === IconEnum.Camera && styles.icon("camera"),
        icon === IconEnum.CameraSwitch && styles.icon("cameraSwitch"),
        icon === IconEnum.Close && styles.icon("close"),
        icon === IconEnum.Delete && styles.icon("delete"),
        icon === IconEnum.DeployedCode && styles.icon("deployedCode"),
        icon === IconEnum.DeployedCodeSharp && styles.icon("deployedCodeSharp"),
        icon === IconEnum.DragIndicator && styles.icon("dragIndicator"),
        icon === IconEnum.ExpandLess && styles.icon("expandLess"),
        icon === IconEnum.ExpandMore && styles.icon("expandMore"),
        icon === IconEnum.FileMap && styles.icon("fileMap"),
        icon === IconEnum.Globe && styles.icon("globe"),
        icon === IconEnum.Lightbulb && styles.icon("lightbulb"),
        icon === IconEnum.LightbulbRounded && styles.icon("lightbulbRounded"),
        icon === IconEnum.Menu && styles.icon("menu"),
        icon === IconEnum.MoreVert && styles.icon("moreVert"),
        icon === IconEnum.MoveSelectionUp && styles.icon("moveSelectionUp"),
        icon === IconEnum.QuestionMark && styles.icon("questionMark"),
        icon === IconEnum.Select && styles.icon("select"),
        icon === IconEnum.Settings && styles.icon("settings"),
        icon === IconEnum.Square && styles.icon("square"),
        icon === IconEnum.SquareRounded && styles.icon("squareRounded"),
        icon === IconEnum.Sunny && styles.icon("sunny"),
        icon === IconEnum.Transform && styles.icon("transform"),
        icon === IconEnum.UploadFile && styles.icon("uploadFile"),
        icon === IconEnum.Visibility && styles.icon("visibility"),
        icon === IconEnum.VisibilityOff && styles.icon("visibilityOff"),
        styles.size(size),
        style
      )}
    />
  );
};

export default Icon;
