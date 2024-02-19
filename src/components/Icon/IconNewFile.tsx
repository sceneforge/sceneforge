import { BaseIcon } from './BaseIcon';
import styles from './IconNewFile.module.css';

export interface IconNewFileProps {
  inverted?: boolean;
}

export const IconNewFile = ({ inverted }: IconNewFileProps) => {
  return (
    <BaseIcon className={styles.wrapper} inverted={inverted}>
      <span aria-hidden="true" className={styles.papper}>
        <span aria-hidden="true" className={styles.iec}></span>
        <span aria-hidden="true" className={styles.is}></span>
        <span aria-hidden="true" className={styles.ie}></span>
      </span>
      <span aria-hidden="true" className={styles.cross}></span>
    </BaseIcon>
  )  
}