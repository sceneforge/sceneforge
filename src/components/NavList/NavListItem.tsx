import { NavListButton, type NavListButtonProps } from "./NavListButton";
import { NavListLink, type NavListLinkProps } from "./NavListLink";

import styles from "./NavListItem.module.css";

export type NavListItemProps = (NavListLinkProps | NavListButtonProps) & {
  selected?: boolean;
};

export const NavListItem = ({ children, selected, ...props }: NavListItemProps) => {
  return (
    <li className={styles.wrapper}>
      {("href" in props) ?
        (<NavListLink className={styles.content} {...props as NavListLinkProps} aria-selected={selected ? "true" : "false"}>{children}</NavListLink>) :
        (<NavListButton className={styles.content} {...props as NavListButtonProps} aria-selected={selected ? "true" : "false"}>{children}</NavListButton>)
      }
    </li>
  );
}