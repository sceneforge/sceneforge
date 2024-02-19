import { BaseIcon } from './BaseIcon';

import styles from './IconMenu.module.css';

export interface IconMenuProps {
  open?: boolean;
  inverted?: boolean;
}

export const IconMenu = ({ open, inverted }: IconMenuProps) => {
  return (
    <BaseIcon className={styles.wrapper} data-open={open ? "true" :  "false"} inverted={inverted}>
      <span aria-hidden="true"></span>
    </BaseIcon>
  )
}