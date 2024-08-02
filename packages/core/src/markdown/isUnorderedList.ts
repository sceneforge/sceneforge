import { isValidElement, type ReactNode } from "react";

export type UnorderedList = {
  [key: string]: unknown;
  props: {
    [key: string]: unknown;
    children?: ReactNode;
  };
  type: "ul";
};

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
