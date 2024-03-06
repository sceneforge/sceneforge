import { useCallback, useState } from "react";
import { Button, type ButtonProps, type ToggleProps } from "../Button";
import { Icon, type IconProps } from "../Icon";

import { ButtonToggleEvent } from "../Button/Button";
import styles from "./IconButton.module.css";

export type IconButtonProps = Omit<ButtonProps, "children" | "clear" | "className"> & ToggleProps<
  {
    prefix?: IconProps["prefix"] | [IconProps["prefix"], IconProps["prefix"]];
    icon: IconProps["icon"] | [IconProps["icon"], IconProps["icon"]];
  },
  {
    prefix?: IconProps["prefix"];
    icon: IconProps["icon"];
  }
>;

export const IconButton = ({
  toggle,
  variant,
  pressed,
  onToggle,
  prefix,
  icon,
  ...props
}: IconButtonProps) => {
  const [currentPrefix, setCurrentPrefix] = useState<IconProps["prefix"]>(Array.isArray(prefix) ? prefix[0] : prefix);
  const [currentIcon, setCurrentIcon] = useState<IconProps["icon"]>(Array.isArray(icon) ? icon[0] : icon);

  const handleToggleEvent = useCallback((e: ButtonToggleEvent) => {
    if (e.state === "pressed") {
      if (Array.isArray(prefix)) {
        setCurrentPrefix(prefix[1]);
      }
      if (Array.isArray(icon)) {
        setCurrentIcon(icon[1]);
      }
    } else {
      if (Array.isArray(prefix)) {
        setCurrentPrefix(prefix[0]);
      }
      if (Array.isArray(icon)) {
        setCurrentIcon(icon[0]);
      }
    }
    if (onToggle) onToggle(e);
  }, [icon, onToggle, prefix]);

  const toggleProps: ToggleProps = toggle ? { toggle: true, variant, pressed, onToggle: handleToggleEvent } : { variant }

  return (
    <Button
      className={styles.wrapper}
      clear
      data-icon-button
      {...toggleProps}
      {...props}
    >
      <Icon prefix={currentPrefix} icon={currentIcon} />
    </Button>
  );
};
