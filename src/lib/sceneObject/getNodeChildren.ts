export const getNodeChildren = (node: unknown): unknown[] => {
  return typeof node === "object" && node !== null && !Array.isArray(node)
    ? "getChildrenMeshes" in node &&
      typeof node.getChildrenMeshes === "function"
      ? (node.getChildrenMeshes() as unknown[])
      : "getChildren" in node && typeof node.getChildren === "function"
        ? (node.getChildren() as unknown[])
        : []
    : [];
};
