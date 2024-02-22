import { type PropsWithChildren } from "react";

import styles from "./InputList.module.css";

export type InputListProps = PropsWithChildren;

export const InputList = ({ children }: InputListProps) => {
  return (
    <form>
      <ul className={styles.wrapper}>
        {children}
      </ul>
    </form>
  );
};
