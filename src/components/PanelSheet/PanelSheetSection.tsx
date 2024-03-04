import { type PropsWithChildren } from "react";
import styles from "./PanelSheetSection.module.css";

export type PanelSheetSectionProps = PropsWithChildren<{
  title?: string
}>;

export const PanelSheetSection = ({
  title,
  children
}: PanelSheetSectionProps) => {
  return (
    <section className={styles.wrapper}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>
        {children}
      </div>
    </section>
  )
}