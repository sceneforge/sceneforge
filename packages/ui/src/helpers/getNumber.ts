export const getNumber = (number_?: unknown, fallback?: number): number => {
  if (typeof number_ === "number") return number_;
  if (typeof number_ === "string" || number_ instanceof String) {
    const parsed = Number.parseFloat(number_.toString().replaceAll(/[^\d,-_a-f]/g, ""));
    if (Number.isNaN(parsed)) return fallback ?? 0;
    return parsed;
  }
  if (number_ instanceof Number) return number_.valueOf();
  return fallback ?? 0;
};
