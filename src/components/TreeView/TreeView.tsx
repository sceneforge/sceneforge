import { Fragment, type ReactNode } from "react";
import { TreeSummary } from "./TreeSummary";
import styles from "./TreeView.module.css";

type Component<T = unknown> = (
  props: Omit<TreeNode<T>, "children" | "component">,
  ...args: unknown[]
) => JSX.Element | ReactNode | null;

export type TreeNode<T = unknown> = {
  id: string;
  label?: string;
  component?: Component<T>;
  children?: TreeNode<T>[];
  reference?: T;
};

export type TreeViewProps<T = unknown> = {
  data: TreeNode<T>[];
  summaryComponent?: Component<T>;
  itemComponent?: Component<T>;
  className?: string;
}

export const TreeView = <T = unknown>({
  className,
  data,
  summaryComponent: SummaryComponent,
  itemComponent: ItemComponent
}: TreeViewProps<T>) => {
  const classNames = [styles.wrapper, className].filter(Boolean).join(" ");

  return (
    <div className={classNames}>
      {data.map(({ children, component: Component, label, id, reference }) => (
        children && children.length > 0 ? (
          <details key={id}>
            {children && (
              <>
                <TreeSummary id={id} label={label} component={Component ?? SummaryComponent} reference={reference} />
                <TreeView data={children} summaryComponent={SummaryComponent} itemComponent={ItemComponent} />
              </>
            )}
          </details>
        ) : (
          <Fragment key={id}>
            {label && !Component && !ItemComponent && (<div>{label}</div>)}
            {ItemComponent && !Component && (
              <ItemComponent id={id} label={label} reference={reference} />
            )}
            {Component && (
              <Component id={id} label={label} reference={reference} />
            )}
          </Fragment>
        )
      ))}
    </div>
  );
};
