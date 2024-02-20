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
        (
          <NavListLink
            aria-selected={selected ? "true" : "false"}
            className={styles.content}
            {...props as NavListLinkProps}
          >
            {children}
          </NavListLink>
        ) :
        "header" in props ?
          (<NavListSection {...props as NavListSectionProps}>{children}</NavListSection>) :
          (
            <NavListButton
              aria-selected={selected ? "true" : "false"}
              className={styles.content}
              {...props as NavListButtonProps}
            >
              {children}
            </NavListButton>
          )
      }
    </li>
  );
};
