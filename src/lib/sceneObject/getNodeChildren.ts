export const getNodeChildren = (node: unknown): unknown[] => {
  if (typeof node === "object" && node !== null && !Array.isArray(node)) {
    const getChildren =
      "getChildMeshes" in node && typeof node.getChildMeshes === "function"
        ? node.getChildMeshes
        : "getChildren" in node && typeof node.getChildren === "function"
          ? node.getChildren
          : () => [];
    return getChildren() as unknown[];
  }
  return [];
};
