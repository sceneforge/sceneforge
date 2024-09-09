import type { ElementContent } from "hast";

import { isCustomBlockquote } from "./isCustomBlockquote";

/**
 * Checks if the given node is a gallery custom blockquote
 *
 * @param node The node, or element content, to check for
 * @returns True if the given node is a gallery blockquote, false otherwise
 */
export const isGallery = (node: ElementContent) => {
  return isCustomBlockquote(node, "gallery");
};
