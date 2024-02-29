import { Button } from "../Button";
import { IconButton } from "../IconButton/IconButton";

import styles from "./TabItem.module.css";

export interface TabItemProps {
  id: string;
  title: string;
  active?: boolean;
  onCloseClick?: () => void;
  onActiveClick?: () => void;
}

export const TabItem = ({ id, title, onCloseClick, onActiveClick, active }: TabItemProps) => {
  return (
    <li className={styles.wrapper}>
      <Button
        aria-controls={`tabpanel-${id}`}
        aria-label={title}
        aria-selected={active ? "true" : "false"}
        clear
        role="tab"
        tabIndex={active ? 0 : -1}
        title={title}
        onClick={onActiveClick}
      >
        {title}
      </Button>
      <IconButton
        aria-label="close"
        icon="close"
        size="xs"
        title="Close"
        onClick={onCloseClick} />
    </li>
  );
};
