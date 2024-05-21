import { Gallery } from "../Gallery";
import { type PropsWithChildren, ReactNode } from "react";

const filterEmptyLines = (child: unknown): unknown => {
  return (
    child
    && (typeof child !== "string"
    || (typeof child === "string"
    && child.trim() !== ""
    && child.trim() !== "\n"))
  );
};

const blockTypeRegExp = /^\[!([A-Z][\dA-Z_]*)]/;

const blockTypeComponent: Record<
  string,
  (props: PropsWithChildren) => JSX.Element
> = {
  GALLERY: Gallery,
};

const isParagraphElement = (
  element: unknown
): element is {
  props: Record<string, unknown>;
  type: "p";
  [key: string]: unknown;
} => {
  if (
    element
    && typeof element === "object"
    && element !== null
    && !Array.isArray(element)
    && "type" in element
    && typeof element.type === "string"
    && element.type === "p"
  )
    return true;
  return false;
};

const getParagraphChildren = (element: unknown): unknown => {
  if (isParagraphElement(element)
    && "props" in element
    && typeof element.props === "object"
    && element.props !== null
    && "children" in element.props) {
    return element.props.children;
  }
  return [];
};

export const parseBlock = (
  children: unknown
): {
    Component: ((props: Record<string, unknown>) => JSX.Element) | null;
    props: Record<string, unknown>;
  } => {
  if (Array.isArray(children)) {
    const elements: unknown[] = children
      .filter(element => filterEmptyLines(element));
    if (elements.length > 1) {
      const children = getParagraphChildren(elements[0]);
      if (typeof children === "string" && blockTypeRegExp.test(children)) {
        const result = blockTypeRegExp.exec(children);
        if (
          result
          && result.length === 2
          && typeof result[1] === "string"
          && result[1] in blockTypeComponent
        ) {
          return {
            Component: blockTypeComponent[result[1]],
            props: {
              children: elements.slice(1) as ReactNode,
            },
          };
        }
      }
    }
  }

  return {
    Component: null,
    props: {},
  };
};
