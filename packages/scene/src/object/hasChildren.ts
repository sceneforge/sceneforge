export const hasChildren = (node: unknown): boolean => {
  if (typeof node === "object" && node !== null) {
    const children: unknown
      = "getChildMeshes" in node && typeof node.getChildMeshes === "function"
        ? node.getChildMeshes()
        : ("getChildren" in node && typeof node.getChildren === "function"
          ? node.getChildren()
          : []);
    if (Array.isArray(children) && children.length > 0) {
      return true;
    }
  }
  return false;
};
