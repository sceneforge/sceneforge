import { Button } from "../Button";
import { IconButton } from "../IconButton/IconButton";

import styles from './Tab.module.css';

export interface TabProps {
  title: string;
  active?: boolean;
  onCloseClick?: () => void;
  onActiveClick?: () => void;
}

export const Tab = ({ title, onCloseClick, onActiveClick, active }: TabProps) => {
  return (
    <li className={styles.wrapper} role="tab" aria-label={title} aria-selected={active ? "true" : "false"}>
      <Button clear onClick={onActiveClick} title={title}>{title}</Button>
      <IconButton size="xs" icon="close" title="Close" aria-label="close" inverted onClick={onCloseClick} />
    </li>
  )
}