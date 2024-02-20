import { useEffect, type PropsWithChildren } from "react";
import styles from "./Page.module.css";

export type PageProps = PropsWithChildren<{ title: string; }>;

export const Page = ({ title, children }: PageProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className={styles.wrapper}>{children}</div>
  );
};
