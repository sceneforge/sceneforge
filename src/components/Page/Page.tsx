import type { PropsWithChildren } from "react";

export type PageProps = PropsWithChildren<{ title: string }>;

import styles from './Page.module.css';

export const Page = ({ title, children }: PageProps) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1>{title}</h1>
      </div>
      <div>{children}</div>
    </div>
  )
}