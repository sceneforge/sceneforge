import { NavListButton, type NavListButtonProps } from "./NavListButton";
import { NavListLink, type NavListLinkProps } from "./NavListLink";

import styles from "./NavListItem.module.css";
import { NavListSection, type NavListSectionProps } from "./NavListSection";

export type NavListItemProps = (NavListLinkProps | NavListButtonProps | NavListSectionProps) & {
  selected?: boolean;
};

export const NavListItem = ({ children, selected, ...props }: NavListItemProps) => {
  return (
    <li className={styles.wrapper}>
      {("href" in props) ?
        (<NavListLink className={styles.content} {...props as NavListLinkProps} aria-selected={selected ? "true" : "false"}>{children}</NavListLink>) :
        "header" in props ?
          (<NavListSection {...props as NavListSectionProps}>{children}</NavListSection>) :
          (<NavListButton className={styles.content} {...props as NavListButtonProps} aria-selected={selected ? "true" : "false"}>{children}</NavListButton>)
      }
    </li>
  );
}