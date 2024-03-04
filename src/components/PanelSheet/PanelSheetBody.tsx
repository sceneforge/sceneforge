import { type PropsWithChildren } from "react";
import styles from "./PanelSheetBody.module.css";

export type PanelSheetBodyProps = PropsWithChildren;

export const PanelSheetBody = ({ children }: PanelSheetBodyProps) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}