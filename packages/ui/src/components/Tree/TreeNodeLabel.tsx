import * as stylex from "@stylexjs/stylex";
import { MouseEventHandler } from "react";

import { IconEnum } from "../../types";
import { Button, ButtonProps } from "../Button";
import { Icon } from "../Icon";
import { View, ViewProps } from "../View";

export type TreeNodeLabelProps = {
  hasNodes?: boolean;
  icon?: IconEnum;
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const styles = stylex.create({
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    border: "none",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    flexWrap: "nowrap",
    gap: "0.25rem",
    justifyContent: "flex-start",
    textAlign: "start",
  },
});

const Wrapper = ({ onClick, ...props }: ButtonProps | ViewProps) => {
  if (onClick) {
    return <Button onClick={onClick as ButtonProps["onClick"]} {...props as ButtonProps} />;
  }

  return <View {...props as ViewProps} />;
};

const TreeNodeLabel = ({
  hasNodes,
  icon,
  label,
  onClick,
}: TreeNodeLabelProps) => {
  return (
    <Wrapper
      margin={0}
      onClick={onClick || undefined}
      padding={{
        inlineStart: hasNodes ? 0 : 1,
      }}
      style={[
        styles.container,
      ]}
    >
      {icon && <Icon icon={icon} />}
      {label}
    </Wrapper>
  );
};

export default TreeNodeLabel;
