import { useCallback, type PropsWithChildren } from "react";
import { IconButton, type IconButtonProps } from "../../components/IconButton/IconButton";
import { usePanel } from "../Panel/PanelProvider";
import { SideBar } from "../SideBar";
import { SidePanel } from "../SidePanel/SidePanel";
import styles from './Topbar.module.css';

export type TopbarProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  topbarIconButtons?: IconButtonProps[];
}>

export const Topbar = ({ title, subtitle, topbarIconButtons, children }: TopbarProps) => {
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
        <IconButton icon="menu" aria-label="Menu" title="Menu" open={menuShow} onClick={toggleMenu} />
        <h1>{title}{subtitle && (<small>{subtitle}</small>)}</h1>
        {topbarIconButtons?.map((props, index) => (<IconButton key={index} {...props} />))}
      </div>
    </header>
  )
};