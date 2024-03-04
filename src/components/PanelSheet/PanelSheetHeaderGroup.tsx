import { type PropsWithChildren, type ReactNode } from "react";
import { Popover } from "../Popover";
import styles from "./PanelSheetHeaderGroup.module.css";

export type PanelSheetHeaderGroupProps = PropsWithChildren<{
  title?: string;
  description?: ReactNode;
}>;

export const PanelSheetHeaderGroup = ({ title, description, children }: PanelSheetHeaderGroupProps) => {
  return (
    <>
      <div className={styles.wrapper} aria-label={title}>
        {title && !description && (<h3 className={styles.title}>{title}</h3>)}
        {title && description && (<Popover className={styles.title} clear backdrop title={title}>{description}</Popover>)}
        {children}
      </div>
    </>
  )
}