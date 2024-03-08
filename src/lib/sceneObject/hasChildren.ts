export const hasChildren = (node: unknown): boolean => {
  if (typeof node === "object" && node !== null) {
    if ("getChildMeshes" in node && typeof node.getChildMeshes === "function") {
      return node.getChildMeshes().length > 0;
    }
    if ("getChildren" in node && typeof node.getChildren === "function") {
      return node.getChildren().length > 0;
    }
  }
  return false;
}