import { useCallback, type PropsWithChildren } from "react";
import { IconButton, type IconButtonProps } from "../../components/IconButton/IconButton";
import { usePanel } from "../Panel/PanelProvider";
import { SideBar } from "../SideBar";
import { SidePanel } from "../SidePanel/SidePanel";
import styles from "./Topbar.module.css";

export type TopbarProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  iconButtonsStart?: IconButtonProps[];
  iconButtonsEnd?: IconButtonProps[];
}>;

export const Topbar = ({
  title,
  subtitle,
  iconButtonsStart,
  iconButtonsEnd,
  children
}: TopbarProps) => {
  const { menuShow, setMenuShow, sidePanelShow } = usePanel();

  const toggleMenu = useCallback(() => {
    if (setMenuShow) {
      setMenuShow((value) => !value);
    }
  }, [setMenuShow]);

  return (
    <header className={styles.wrapper}>
      <SideBar menuOpen={menuShow}>{children}</SideBar>
      <SidePanel show={sidePanelShow} />
      <div className={styles.bar}>
        <IconButton
          aria-label="Menu"
          icon={menuShow ? "close" : "menu"}
          title="Menu"
          onClick={toggleMenu}
        />
        <h1>{title}{subtitle && (<small>{subtitle}</small>)}</h1>
        {iconButtonsStart?.length && (
          <div className={styles.ibs}>
            {iconButtonsStart.map((props, index) => (<IconButton key={index} {...props} />))}
          </div>
        )}
        {iconButtonsEnd?.length && (
          <div className={styles.ibe}>
            {iconButtonsEnd.map((props, index) => (<IconButton key={index} {...props} />))}
          </div>
        )}
      </div>
    </header>
  );
};
