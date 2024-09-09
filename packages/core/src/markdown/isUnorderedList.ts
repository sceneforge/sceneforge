import { isValidElement, type ReactNode } from "react";

/**
 * Type representing an unordered list element.
 */
export type UnorderedList = {
  [key: string]: unknown;
  props: {
    [key: string]: unknown;
    children?: ReactNode;
  };
  type: "ul";
};

/**
 * Type guard for checking if a given node is an unordered list element.
 *
 * @param node A node object with unknown type
 * @returns True if the node is an unordered list element, false otherwise.
 */
export const isUnorderedList = (node: unknown): node is UnorderedList => {
  if (
    node
    && typeof node === "object"
    && "type" in node
    && node.type
    && node.type === "ul"
    && "props" in node
    && typeof node.props === "object"
    && node.props !== null
    && !Array.isArray(node.props)
    && "children" in node.props
    && isValidElement(node.props.children)
  ) {
    return true;
  }
  return false;
};
