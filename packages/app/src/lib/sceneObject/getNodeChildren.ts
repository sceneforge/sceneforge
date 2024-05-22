export const getNodeChildren = (node: unknown): unknown[] => {
  if (typeof node === "object" && node !== null && !Array.isArray(node)) {
    if ("getChildrenMeshes" in node && typeof node.getChildrenMeshes === "function") {
      return node.getChildrenMeshes() as unknown[];
    }
    else if ("getChildren" in node && typeof node.getChildren === "function") {
      return (node.getChildren() as unknown[]);
    }
  }
  return [];
};
