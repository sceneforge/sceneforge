import { Button } from "../Button";
import { IconButton } from "../IconButton/IconButton";

import styles from "./Tab.module.css";

export interface TabProps {
  title: string;
  active?: boolean;
  onCloseClick?: () => void;
  onActiveClick?: () => void;
}

export const Tab = ({ title, onCloseClick, onActiveClick, active }: TabProps) => {
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
        inverted
        size="xs"
        title="Close"
        onClick={onCloseClick} />
    </li>
  );
};
