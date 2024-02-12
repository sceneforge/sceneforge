import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

export type NavListLinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const NavListLink = ({ href, children, ...props }: NavListLinkProps) => {
  return (<a href={href} {...props}>{children}</a>);
}