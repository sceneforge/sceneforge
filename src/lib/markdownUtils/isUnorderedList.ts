import { ReactNode, isValidElement } from "react";

export type UnorderedList = {
  type: "ul";
  props: {
    children?: ReactNode;
    [key: string]: unknown;
  };
  [key: string]: unknown;
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
