import { useCallback, type PropsWithChildren } from "react";
import { ButtonMenu } from "../Button";

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
    
    <div className={styles.wrapper}>
      <SideBar menuOpen={menuShow}>{children}</SideBar>
      <SidePanel show={sidePanelShow} />
      <div className={styles.bar}>
        <ButtonMenu onClick={toggleMenu} menuOpen={menuShow} />
        <h1>{title}{subtitle && (<small>{subtitle}</small>)}</h1>
      </div>
    </div>
    
  )
};