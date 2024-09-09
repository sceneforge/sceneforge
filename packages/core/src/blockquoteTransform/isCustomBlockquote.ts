import type { Element, ElementContent } from "hast";

export interface BlockquoteElement extends Element {
  tagName: "blockquote";
};

/**
 * Check if the given node is a custom blockquote based on the given parameter
 *
 * @remarks
 *
 * First, it checks if the given node is a blockquote element, and them, by
 * checking its children, it verifys if the first child is a paragraph element
 * containing the expected text template based on the parameter or if the
 * second child is a paragraph element containing the expected text template
 * when the first child is a text element containing a line break only.
 *
 * @param node The node, or element content, to check for
 * @param parameter The expected parameter to check for the custom blockquote
 * @returns True if the given node is a custom blockquote, false otherwise
 */
export const isCustomBlockquote = (
  node: ElementContent,
  parameter: string
): node is BlockquoteElement => {
  if (
    node.type === "element"
    && node.tagName === "blockquote"
  ) {
    if (
      node.children.length > 1
      && node.children[0].type === "element"
      && node.children[0].tagName === "p"
      && node.children[0].children.length === 1
      && node.children[0].children[0].type === "text"
      && node.children[0].children[0].value === `[!${parameter.toUpperCase()}]`
    ) {
      return true;
    }
    else if (
      node.children.length > 2
      && node.children[0].type === "text"
      && node.children[0].value === "\n"
      && node.children[1].type === "element"
      && node.children[1].tagName === "p"
      && node.children[1].children.length === 1
      && node.children[1].children[0].type === "text"
      && node.children[1].children[0].value === `[!${parameter.toUpperCase()}]`
    ) {
      return true;
    }
  }
  return false;
};
