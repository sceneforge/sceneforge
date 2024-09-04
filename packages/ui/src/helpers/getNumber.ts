export const getNumber = (value?: unknown, fallback?: number): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string" || value instanceof String) {
    const parsed = Number.parseFloat(value.toString().replaceAll(/[^\d,_a-f-]/g, ""));
    if (Number.isNaN(parsed)) return fallback ?? 0;
    return parsed;
  }
  if (value instanceof Number) return value.valueOf();
  return fallback ?? 0;
};
