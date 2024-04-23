import { type BlockquoteProps } from "./Blockquote";
import { Gallery } from "../Gallery";
import { type PropsWithChildren } from "react";

const filterEmptyLines = (child: string | JSX.Element) => {
  return (
    child &&
    (typeof child !== "string" ||
      (typeof child === "string" &&
        child.trim() !== "" &&
        child.trim() !== "\n"))
  );
};

const blockTypeRegExp = /^\[!([A-Z][A-Z0-9_]*)\]/;

const blockTypeComponent: Record<
  string,
  (props: PropsWithChildren) => JSX.Element
> = {
  GALLERY: Gallery,
};

export const parseBlock = (children: BlockquoteProps["children"]) => {
  if (Array.isArray(children)) {
    const elements = children.filter(filterEmptyLines);
    if (elements.length > 1) {
      if (
        elements[0].type === "p" &&
        blockTypeRegExp.test(elements[0].props.children)
      ) {
        const result = blockTypeRegExp.exec(elements[0].props.children);
        if (
          result &&
          result.length === 2 &&
          typeof result[1] === "string" &&
          result[1] in blockTypeComponent
        ) {
          return {
            Component: blockTypeComponent[result[1]],
            props: {
              children: elements.slice(1),
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
