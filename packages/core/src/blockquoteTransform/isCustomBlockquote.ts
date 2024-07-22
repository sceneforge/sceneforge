import type { Element, ElementContent } from "hast";

export interface BlockquoteElement extends Element {
  tagName: "blockquote";
};

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
