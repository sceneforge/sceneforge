export const id = (node: unknown): string => {
  if (typeof node === "object" && node !== null) {
    if ("id" in node && typeof node.id === "string") {
      return node.id;
    }
    return "Unknown Node Object";
  }
  return "Unknown Node Object";
};
