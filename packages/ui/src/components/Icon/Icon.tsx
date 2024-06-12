import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { Ref, HTMLAttributes } from "react";
import { IconEnum, Variant } from "../../types";
import { color, icons } from "../tokens.stylex";

export type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, "className" | "style"> & {
  icon: IconEnum;
  size?: number;
  variant?: Variant;
  ref?: Ref<HTMLSpanElement>;
  style?: StyleXStyles;
};

const styles = stylex.create({
  container: {
    display: "block",
    backgroundColor: "currentColor",
    width: "1em",
    height: "1em",
    maskSize: "100% 100%",
    maskRepeat: "no-repeat",
    color: "inherit",
  },
  size: (size: number) => ({
    width: `${0.25 * size}rem`,
    height: `${0.25 * size}rem`,
    minWidth: `${0.25 * size}rem`,
    minHeight: `${0.25 * size}rem`,
  }),
  variantColor: (text: keyof typeof color) => ({
    color: color[text],
  }),
  icon: (iconKey: keyof typeof icons) => ({
    mask: `${String(icons[iconKey])} no-repeat`,
  }),
});

const Icon = ({
  icon,
  size = 4,
  variant,
  style,
  ref,
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
        style,
      )}
    />
  );
};

export default Icon;
