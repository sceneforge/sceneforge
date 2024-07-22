import type { ElementContent } from "hast";

import { isCustomBlockquote } from "./isCustomBlockquote";

export const isGallery = (node: ElementContent) => {
  return isCustomBlockquote(node, "gallery");
};
