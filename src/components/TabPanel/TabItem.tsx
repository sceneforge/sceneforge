import { Button } from "../Button";
import { IconButton } from "../IconButton/IconButton";

import styles from "./TabItem.module.css";

export interface TabItemProps {
  title: string;
  active?: boolean;
  index?: number;
  onCloseClick?: () => void;
  onActiveClick?: () => void;
}

export const TabItem = ({
  title,
  onCloseClick,
  onActiveClick,
  active,
  index
}: TabItemProps) => {
  return (
    <li className={styles.wrapper}>
      <Button
        aria-controls={`tabpanel-${index}`}
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
        variant="inverted"
        onClick={onCloseClick} />
    </li>
  );
};
