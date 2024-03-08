export const isVisible = (node: unknown): boolean | undefined => {
  if (typeof node === "object" && node !== null) {
    if ("isVisible" in node && typeof node.isVisible === "boolean") {
      return node.isVisible;
    } else if ("isEnabled" in node && typeof node.isEnabled === "boolean") {
      return node.isEnabled;
    } else if ("isEnabled" in node && typeof node.isEnabled === "function") {
      return node.isEnabled();
    }
  }
  return undefined;
}