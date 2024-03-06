import { MouseEventHandler, PropsWithChildren } from "react";
import { Button } from "../Button";
import styles from "./NodeLabel.module.css";

export type NodeLabelProps = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLElement>;
  summary?: boolean;
}>

export const NodeLabel = ({ summary, onClick, children }: NodeLabelProps) => {
  if (summary) {
    return (
      <div className={styles.wrapper} onClick={onClick}>{children}</div>
    )
  }
  return (
    <Button clear className={styles.wrapper} onClick={onClick}>{children}</Button>
  )
}