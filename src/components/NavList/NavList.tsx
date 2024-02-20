import type { PropsWithChildren } from "react";

import styles from "./NavList.module.css";

export type NavListProps = PropsWithChildren<{
  direction?: "horizontal" | "vertical";
}>;

export const NavList = ({ children, direction = "vertical" }: NavListProps) => {
  return (
    <nav className={styles.wrapper} data-direction={direction}>
      <ul>{children}</ul>
    </nav>
  );
};
