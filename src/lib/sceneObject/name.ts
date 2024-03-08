export const name = (node: unknown): string => {
  if (typeof node === "object" && node !== null) {
    if ("name" in node && typeof node.name === "string") {
      return node.name;
    }
    if ("id" in node && typeof node.id === "string") {
      return node.id;
    }
    return node.constructor.name;
  }
  return "Unknown Node Object";
}