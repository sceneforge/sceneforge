import { TreeNode } from "./TreeView";

export type TreeSummaryProps<T = unknown> = TreeNode<T>;

export const TreeSummary = <T = unknown>({
  id,
  label,
  component: Component,
  reference
}: TreeSummaryProps<T>) => {
  const content = Component ? (
    <Component id={id} label={label} reference={reference} />
  ) : label ?? null;

  return Component ? content : <summary>{content}</summary>;
};
