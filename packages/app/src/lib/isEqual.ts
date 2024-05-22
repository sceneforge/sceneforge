export const isEqual = (a: unknown, b: unknown): boolean => {
  if (typeof a !== typeof b) return false;
  if (a === undefined && b !== undefined) return false;
  if (a !== undefined && b === undefined) return false;
  if (a === undefined && b === undefined) return true;
  if (typeof a !== "object" && typeof b !== "object" && a !== b) return false;
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
        for (const [index, element] of a.entries()) {
          if (!isEqual(element, b[index])) return false;
        }
      }
      else {
        const aKeys = Object.keys(a).toSorted() as (keyof typeof a)[];
        const bKeys = Object.keys(b).toSorted() as (keyof typeof b)[];
        if (aKeys.length !== bKeys.length) return false;
        for (const [index, aKey] of aKeys.entries()) {
          if (aKey !== bKeys[index]) return false;
          if (!(aKey in b) || !(bKeys[index] in a)) return false;
          if (!isEqual(a[aKey], b[bKeys[index]])) return false;
        }
      }
    }
  }

  return true;
};
