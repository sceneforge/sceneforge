import { type ReactNode } from "react";
import styles from "./TreeView.module.css";

type Component<P extends Record<string, unknown> = Record<string, unknown>> = (
  props: P,
  ...args: unknown[]
) => (JSX.Element | ReactNode | null);

export type TreeNode = {
  id: string;
  label?: string;
  component?: Component;
  children?: TreeNode[];
};

export interface TreeViewProps {
  data: TreeNode[];
}

export const TreeView = ({ data }: TreeViewProps) => {
  return (
    <div className={styles.wrapper}>
      {data.map(({ children, component: Component, label, id }) => (
        children && children.length > 0 ? (
          <details key={id}>
            {label && !Component && (<summary>{label}</summary>)}
            {Component && (
              <summary>
                <Component />
              </summary>
            )}
            {children && (
              <TreeView data={children} />
            )}
          </details>
        ) : (
          <div key={id}>{label}</div>
        )
      ))}
    </div>
  );
}