import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type AllHTMLAttributes, type Ref, lazy } from "react";

import type { OptionProps } from "./Option";

import { borderStyles, roundedStyles } from "../../borders.stylex";
import { colorStyles } from "../../colors.stylex";
import { IconEnum, Shape } from "../../types";
import { Button, type ButtonProps } from "../Button";
import { Icon } from "../Icon";
import { Unlisted } from "../Unlisted";
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
    height: null,
    insetArea: "span-block-end",
    insetBlockStart: "anchor(bottom)",
    overflow: "clip",
    position: "absolute",
    width: null,
  },
  popover: (id: string) => ({
    positionAnchor: `--select-anchor-${id.replaceAll(":", "-")}`,
  } as Record<string, string>),
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
        shape={Shape.Rounded}
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
      <Unlisted
        id={popoverOptionsId}
        popover="auto"
        style={[
          styles.list,
          styles.popover(currentId),
          colorStyles.default,
          roundedStyles.rounded(2),
          borderStyles.border,
          borderStyles.borderSize(1),
          borderStyles.borderDefault(25),
          popoverStyle,
        ]}
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
      </Unlisted>
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
