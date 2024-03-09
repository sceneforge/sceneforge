import { useCallback, type PropsWithChildren } from "react";
import { IconButton, type IconButtonProps } from "../../components/IconButton/IconButton";
import { usePanel } from "../Panel";
import { SideBar } from "../SideBar";
import { SidePanel } from "../SidePanel/SidePanel";
import { useTabPanel } from "../TabPanel";
import styles from "./Topbar.module.css";

export type TopbarProps = PropsWithChildren<{
  title: string;
  iconButtonsStart?: IconButtonProps[];
  iconButtonsEnd?: IconButtonProps[];
}>;

export const Topbar = ({
  title,
  iconButtonsStart,
  iconButtonsEnd,
  children
}: TopbarProps) => {
  const { menuShow, setMenuShow, sidePanelShow } = usePanel();
  const { tabsPosition } = useTabPanel();

  const toggleMenu = useCallback(() => {
    if (setMenuShow) {
      setMenuShow((value) => !value);
    }
  }, [setMenuShow]);

  return (
    <header data-tabs-position={tabsPosition} className={styles.wrapper}>
      <SideBar menuOpen={menuShow}>{children}</SideBar>
      <SidePanel show={sidePanelShow} />
      <div className={styles.bar}>
        <IconButton
          aria-label="Menu"
          icon={menuShow ? "close" : "bars"}
          title="Menu"
          onClick={toggleMenu}
        />
        <h1>{title}</h1>
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
