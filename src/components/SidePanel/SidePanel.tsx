import { usePanel } from "../Panel/PanelProvider";
import styles from "./SidePanel.module.css";

export interface SidePanelProps {
  show?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const SidePanel = ({ size = "sm" }: SidePanelProps) => {
  const { sidePanelContent, sidePanelShow } = usePanel();

  return (
    <aside className={styles.wrapper} aria-hidden={sidePanelShow && sidePanelContent ? "false" : "true"} data-size={size}>
      {sidePanelShow && sidePanelContent}
    </aside>
  );
}