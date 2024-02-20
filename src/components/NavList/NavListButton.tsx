import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type NavListButtonProps = Omit<DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
>, "type">;

export const NavListButton = ({ children, ...props }: NavListButtonProps) => {
  return (<button type="button" {...props}>{children}</button>);
};
