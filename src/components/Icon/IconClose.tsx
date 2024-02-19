import { BaseIcon } from './BaseIcon';

import styles from './IconClose.module.css';

export interface IconCloseProps {
  inverted?: boolean;
}

export const IconClose = ({ inverted }: IconCloseProps) => {
  return (
    <BaseIcon className={styles.wrapper} inverted={inverted}>
      <span aria-hidden="true"></span>
    </BaseIcon>
  )
}