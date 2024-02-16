import { useCallback, type PropsWithChildren } from "react";

import { IconButton } from "../IconButton/IconButton";
import { usePanel } from "../Panel/PanelProvider";
import { SideBar } from "../SideBar";
import { SidePanel } from "../SidePanel/SidePanel";
import styles from './Topbar.module.css';

export type TopbarProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>

export const Topbar = ({ title, subtitle, children }: TopbarProps) => {
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
        <IconButton icon="menu" open={menuShow} onClick={toggleMenu} />
        <h1>{title}{subtitle && (<small>{subtitle}</small>)}</h1>
      </div>
    </header>
    
  )
};