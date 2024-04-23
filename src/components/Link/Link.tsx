import {
  type AnchorHTMLAttributes,
  type ForwardedRef,
  forwardRef,
} from "react";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = forwardRef(function Link(
  props: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  return <a {...props} ref={ref} />;
});
