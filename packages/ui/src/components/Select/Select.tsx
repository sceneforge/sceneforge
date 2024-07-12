import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type AllHTMLAttributes, type Ref, lazy } from "react";

import type { OptionProps } from "./Option";

import { backgroundColor, foregroundColor } from "../../colors.stylex";
import { IconEnum } from "../../types";
import { Button, type ButtonProps } from "../Button";
import { Icon } from "../Icon";
import { useSelect } from "./useSelect";

const Option = lazy(() => import("./Option"));

export type Option = Omit<OptionProps, "onClick" | "popoverId" | "selected">;

export type SelectProps = {
  dense?: ButtonProps["dense"];
  glossy?: ButtonProps["glossy"];
  inverted?: ButtonProps["inverted"];
  onChange?: (next?: Option["value"], previous?: Option["value"]) => void;
  options?: Option[];
  popoverStyle?: StyleXStyles;
  ref?: Ref<HTMLSelectElement>;
  style?: StyleXStyles;
  variant?: ButtonProps["variant"];
} & Omit<AllHTMLAttributes<HTMLSelectElement>, "onChange" | "style">;

const styles = stylex.create({
  anchor: (id: string) => ({
    anchorName: `--select-anchor-${id.replaceAll(":", "-")}`,
  } as Record<string, string>),
  container: {
    alignItems: "center",
    display: "flex",
    flexFlow: "row",
    flexGrow: 1,
    flexWrap: "nowrap",
    gap: "0.25rem",
    justifyContent: "stretch",
    position: "relative",
  },
  icon: {
    flexShrink: 1,
  },
  list: {
    background: backgroundColor.default,
    border: 0,
    borderColor: backgroundColor.alpha75,
    borderRadius: "0.5rem",
    borderStyle: "solid",
    borderWidth: "1px",
    color: foregroundColor.default,
    insetArea: "span-block-end",
    insetBlockStart: "anchor(bottom)",
    overflow: "clip",
    padding: 0,
    position: "absolute",
  },
  popover: (id: string) => ({
    positionAnchor: `--select-anchor-${id.replaceAll(":", "-")}`,
  }),
  select: {
    display: "none",
  },
});

const Select = ({
  defaultValue,
  dense,
  glossy,
  id,
  inverted,
  onChange,
  options,
  popoverStyle,
  ref,
  style,
  variant,
  ...props
}: SelectProps) => {
  const {
    currentId,
    currentOption,
    hiddenSelectId,
    optionClick,
    popoverOptionsId,
  } = useSelect({
    defaultValue,
    id,
    onChange,
    options,
  });

  return (
    <>
      <Button
        dense={dense}
        glossy={glossy}
        id={currentId}
        inverted={inverted}
        popoverTarget={popoverOptionsId}
        popoverTargetAction="toggle"
        style={[
          styles.container,
          styles.anchor(currentId),
          style,
        ]}
        variant={variant}
      >
        {currentOption?.label ?? currentOption?.value}
        <Icon icon={IconEnum.ExpandMore} style={styles.icon} />
      </Button>
      <ul
        id={popoverOptionsId}
        popover="auto"
        {...stylex.props(
          styles.list,
          styles.popover(currentId),
          popoverStyle
        )}
      >
        {options && options.map((option, index) => (
          <Option
            key={`${currentId}-option-${index}`}
            variant={variant}
            {...option}
            onClick={optionClick(option)}
            popoverId={popoverOptionsId}
            selected={currentOption?.value === option.value}
          />
        ))}
      </ul>
      <select
        id={hiddenSelectId}
        ref={ref}
        {...props}
        {...stylex.props(styles.select)}
        defaultValue={defaultValue}
        value={currentOption?.value}
      >
        {options && options.map((option, index) => (
          <option
            key={`${hiddenSelectId}-option-${index}`}
            value={option.value}
          >
            {option.label || option.value}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
