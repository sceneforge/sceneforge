import { PropsWithChildren } from "react";

import styles from "./Grid.module.css";

export type GridProps = PropsWithChildren<{
  cols?: number;
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
}>;

export const Grid = ({ cols, gap, children }: GridProps) => {
  return (
    <div className={styles.wrapper} data-cols={cols} data-gap={gap}>
      {children}
    </div>
  );
};
