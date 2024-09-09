import type { Element, ElementContent } from "hast";

import { type BlockquoteElement, isCustomBlockquote } from "./isCustomBlockquote";

/**
 * Custom BlockquoteFunction type definition with optional parameters
 */
export type BlockquoteFunction<P = unknown> = (
  node: BlockquoteElement,
  parameters?: P
) => Element;

/**
 * Custom Blockquote transform type definition with optional parameters
 */
export type BlockquoteTransform<
  P = unknown,
  TF extends BlockquoteFunction<P> = BlockquoteFunction<P>,
> = {
  parameters?: P;
  transform: TF;
};

/**
 * Iterate over the given children and transform the custom blockquotes based on
 * the provided quote tag and transform function
 *
 * @param children The array of nodes, or element contents
 * @param quoteTag The custom blockquote parameter to check for
 * @param transform The transform function to apply to the custom blockquote
 * @returns The given array of nodes provided as the children argument, but
 * with the custom blockquotes transformed
 */
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
