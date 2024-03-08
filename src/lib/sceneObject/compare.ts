import { hasChildren } from "./hasChildren";
import { name } from "./name";

export const compare = (a: unknown, b: unknown): number => {
  const aHasChildren = hasChildren(a);
  const bHasChildren = hasChildren(b);

  if (aHasChildren && !bHasChildren) return -1;
  if (!aHasChildren && bHasChildren) return 1;
  const aName = name(a);
  const bName = name(b);
  return aName.localeCompare(bName);
}