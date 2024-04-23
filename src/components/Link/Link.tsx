import {
  type AnchorHTMLAttributes,
  type ForwardedRef,
  forwardRef,
} from "react";
import { ImageDialog } from "../ImageDialog";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = forwardRef(function Link(
  { children, href, ...props }: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  if (
    href &&
    children &&
    typeof children === "object" &&
    "props" in children &&
    "node" in children.props &&
    "tagName" in children.props.node &&
    children.props.node.tagName === "img" &&
    children.props.src === href
  ) {
    return (
      <ImageDialog
        src={children.props.src}
        title={children.props.title}
        alt={children.props.alt}
      />
    );
  }
  return (
    <a {...props} href={href} ref={ref}>
      {children}
    </a>
  );
});
