import type { PropsWithChildren } from "react";
import styles from './Layout.module.css';

export type LayoutProps = PropsWithChildren;

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}