import { PropsWithChildren } from "react";

export type NavListSectionProps = PropsWithChildren<{
  header: string;
}>;

export const NavListSection = ({ header, children }: NavListSectionProps) => {
  return (
    <section>
      <h2>{header}</h2>
      <ul>
        {children}
      </ul>
    </section>
  );
}