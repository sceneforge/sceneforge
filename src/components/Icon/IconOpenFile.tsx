import { BaseIcon } from "./BaseIcon";
import styles from "./IconOpenFile.module.css";

export interface IconOpenFileProps {
  inverted?: boolean;
}

export const IconOpenFile = ({ inverted }: IconOpenFileProps) => {
  return (
    <BaseIcon className={styles.wrapper} inverted={inverted}>
      <span aria-hidden="true" className={styles.back}></span>
      <span aria-hidden="true" className={styles.front}></span>
    </BaseIcon>
  );
};
