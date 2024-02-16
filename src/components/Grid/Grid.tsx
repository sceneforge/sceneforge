import { PropsWithChildren } from "react";

import styles from "./Grid.module.css";

export type GridProps = PropsWithChildren<{
  cols?: number;
}>;

export const Grid = ({ cols, children }: GridProps) => {
  return (
    <div className={styles.wrapper} data-cols={cols}>
      {children}
    </div>
  );
}