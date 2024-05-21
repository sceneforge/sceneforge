import {
  type AnchorHTMLAttributes,
  type ForwardedRef,
  forwardRef,
} from "react";

import { isImageLink } from "../../lib/markdownUtils/isImageLink";
import { ImageDialog } from "../ImageDialog";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = forwardRef(function Link(
  { children, href, ...props }: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  if (isImageLink(children, href)) {
    return <ImageDialog {...children.props} />;
  }
  return (
    <a {...props} href={href} ref={ref}>
      {children}
    </a>
  );
});
