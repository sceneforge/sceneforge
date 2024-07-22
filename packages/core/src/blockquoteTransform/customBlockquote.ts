import type { Element, ElementContent } from "hast";

import { type BlockquoteElement, isCustomBlockquote } from "./isCustomBlockquote";

export type BlockquoteFunction<P = unknown> = (
  node: BlockquoteElement,
  parameters?: P
) => Element;

export type BlockquoteTransform<
  P = unknown,
  TF extends BlockquoteFunction<P> = BlockquoteFunction<P>,
> = {
  parameters?: P;
  transform: TF;
};

export const customBlockquote = <P = unknown>(
  children: ElementContent[],
  quoteTag: string,
  transform: BlockquoteTransform<P>
): ElementContent[] => {
  return children.map((child) => {
    if (isCustomBlockquote(child, quoteTag)) {
      return transform.transform(child, transform.parameters);
    }

    return {
      ...child,
      ...("children" in child && child.children && Array.isArray(child.children)
        ? {
          children: customBlockquote(
            child.children,
            quoteTag,
            transform
          ),
        }
        : {}),
    };
  });
};
