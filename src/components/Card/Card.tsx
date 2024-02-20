import type { PropsWithChildren } from "react";
import styles from "./Card.module.css";

export type CardProps = PropsWithChildren<{
  title?: string;
}>;

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className={styles.wrapper}>
      {title && <span className={styles.title}>{title}</span>}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
