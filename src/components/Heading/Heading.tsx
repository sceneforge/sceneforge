import {
  type HTMLAttributes,
  createElement,
  type ForwardedRef,
  forwardRef,
} from "react";

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

export const Heading = forwardRef(function Heading(
  { level, ...props }: HeadingProps,
  ref: ForwardedRef<HTMLHeadingElement>,
) {
  return createElement(`h${level}`, {
    ...props,
    ref,
  });
});
