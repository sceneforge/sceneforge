import { type AllHTMLAttributes, type ForwardedRef, forwardRef } from "react";

import { parseBlock } from "./parseBlock";

export type BlockquoteProps = AllHTMLAttributes<HTMLQuoteElement>;

export const Blockquote = forwardRef(function Blockquote(
  { children, ...props }: BlockquoteProps,
  ref: ForwardedRef<HTMLQuoteElement>
) {
  const { Component, props: parsedProps } = parseBlock(children);

  if (Component) {
    return <Component {...parsedProps} />;
  }

  return (
    <blockquote {...props} ref={ref}>
      {children}
    </blockquote>
  );
});
