import type { PropsWithChildren } from "react";

import styles from './SideBar.module.css';

export type SideBarProps = PropsWithChildren<{
  menuOpen: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}>;

export const SideBar = ({ menuOpen, children, size = "sm" }: SideBarProps) => {
  return (
    <div className={styles.wrapper} aria-hidden={menuOpen ? "false" : "true"} data-size={size}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}