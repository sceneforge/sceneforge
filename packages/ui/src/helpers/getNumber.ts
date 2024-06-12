export const getNumber = (num?: unknown, fallback?: number): number => {
  if (typeof num === "number") return num;
  if (typeof num === "string" || num instanceof String) {
    const parsed = parseFloat(num.toString().replaceAll(/[^0-9a-fA-F.,-_]/g, ""));
    if (isNaN(parsed)) return fallback ?? 0;
    return parsed;
  }
  if (num instanceof Number) return num.valueOf();
  return fallback ?? 0;
};
