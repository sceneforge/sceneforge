import {
  useRef,
  type PropsWithChildren
} from "react";
import styles from "./PanelSheet.module.css";
import { usePanelSheet } from "./usePanelSheet";

export type PanelSheetProps = PropsWithChildren<{
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  resizable?: boolean;
  orientation?: "inline" | "block";
  position?: "start" | "end";
}>;

export const PanelSheet = ({
  resizable = false,
  orientation = "block",
  position = "end",
  size = "md",
  children
}: PanelSheetProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const { clickDown, mouseOver } = usePanelSheet(panelRef, resizable, orientation, position);

  return (
    <div
      className={styles.wrapper}
      data-dragging={resizable && clickDown ? "true" : "false"}
      data-orientation={orientation}
      data-position={position}
      data-resizable={resizable ? "true" : "false"}
      data-size={size}
      ref={panelRef}
    >
      {resizable && (<div className={styles.overlay} onMouseMove={mouseOver} />)}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
