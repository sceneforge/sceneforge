import styles from "./TreeView.module.css";

export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

export interface TreeViewProps {
  data: TreeNode[];
}

export const TreeView = ({ data }: TreeViewProps) => {
  return (
    <div className={styles.wrapper}>
      {data.map((node) => (
        node.children && node.children.length > 0 ? (
          <details key={node.id}>
            <summary>{node.name}</summary>
            {node.children && (
              <TreeView data={node.children} />
            )}
          </details>
        ) : (
          <div key={node.id}>{node.name}</div>
        )
      ))}
    </div>
  );
}