export const isEqual = (a: unknown, b: unknown): boolean => {
  if (typeof a !== typeof b) return false;
  if (typeof a === "undefined" && typeof b !== "undefined") return false;
  if (typeof a !== "undefined" && typeof b === "undefined") return false;
  if (typeof a === "undefined" && typeof b === "undefined") return true;
  if (typeof a !== "object" && typeof b !== "object") {
    if (a !== b) return false;
  }
  if (typeof a === "object" && typeof b !== "object") return false;
  if (typeof a !== "object" && typeof b === "object") return false;
  if (typeof a === "object" && typeof b === "object") {
    if (a === null && b !== null) return false;
    if (a !== null && b === null) return false;
    if (a === null && b === null) return true;
    if (a !== null && b !== null) {
      if (Array.isArray(a) && !Array.isArray(b)) return false;
      if (!Array.isArray(a) && Array.isArray(b)) return false;
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (!isEqual(a[i], b[i])) return false;
        }
      } else {
        const aKeys = Object.keys(a).toSorted() as (keyof typeof a)[];
        const bKeys = Object.keys(b).toSorted() as (keyof typeof b)[];
        if (aKeys.length !== bKeys.length) return false;
        for (let i = 0; i < aKeys.length; i++) {
          if (aKeys[i] !== bKeys[i]) return false;
          if (!(aKeys[i] in b) || !(bKeys[i] in a)) return false;
          if (!isEqual(a[aKeys[i]], b[bKeys[i]])) return false;
        }
      }
    }
  }

  return true;
};
