import { PropsWithChildren } from "react";

import styles from './SafeArea.module.css';

export type SafeAreaProps = PropsWithChildren;

export const SafeArea = ({ children }: SafeAreaProps) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}