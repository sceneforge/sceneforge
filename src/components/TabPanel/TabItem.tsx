import { Button } from "../Button";
import { IconButton } from "../IconButton/IconButton";

import styles from "./TabItem.module.css";

export interface TabItemProps {
  title: string;
  active?: boolean;
  onCloseClick?: () => void;
  onActiveClick?: () => void;
}

export const TabItem = ({ title, onCloseClick, onActiveClick, active }: TabItemProps) => {
  return (
    <li
      aria-label={title}
      aria-selected={active ? "true" : "false"}
      className={styles.wrapper} role="tab"
    >
      <Button clear title={title} onClick={onActiveClick}>{title}</Button>
      <IconButton
        aria-label="close"
        icon="close"
        size="xs"
        title="Close"
        onClick={onCloseClick} />
    </li>
  );
};
