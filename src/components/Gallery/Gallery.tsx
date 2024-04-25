import { Children, type ReactNode, type PropsWithChildren } from "react";
import { isUnorderedList } from "../../lib/markdownUtils/isUnorderedList";

export type GalleryProps = PropsWithChildren;

export const Gallery = ({ children }: GalleryProps) => {
  return (
    <section className="children">
      {Children.toArray(children).map((child, index) => {
        if (isUnorderedList(child)) {
          return (
            <ul
              className="grid grid-cols-1 m-0 list-none p-0 lg:grid-cols-3 md:grid-cols-2 children:transition-all focus-within:children:translate-y--2 focus-within:children:scale-110 children:children:outline-none hover:children:not-focus-within:translate-y--2 hover:children:not-focus-within:scale-110"
              key={index}
            >
              {(child.props as { children?: ReactNode }).children}
            </ul>
          );
        }
        return child;
      })}
    </section>
  );
};
