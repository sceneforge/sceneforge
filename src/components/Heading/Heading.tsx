import {
  type ForwardedRef,
  type HTMLAttributes,
  createElement,
  forwardRef,
} from "react";

export type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
} & HTMLAttributes<HTMLHeadingElement>;

export const Heading = forwardRef(function Heading(
  { level, ...props }: HeadingProps,
  ref: ForwardedRef<HTMLHeadingElement>
) {
  return createElement(`h${level}`, {
    ...props,
    ref,
  });
});
