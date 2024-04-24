import { type PropsWithChildren } from "react";

export type GalleryProps = PropsWithChildren;

export const Gallery = ({ children }: GalleryProps) => {
  return (
    <section className="children">
      {children &&
        Array.isArray(children) &&
        children.length > 0 &&
        children.map((child, index) => {
          if (
            child &&
            typeof child === "object" &&
            child.type &&
            child.type === "ul"
          ) {
            return (
              <ul
                className="grid grid-cols-1 m-0 list-none p-0 lg:grid-cols-3 md:grid-cols-2 children:transition-all focus-within:children:translate-y--2 focus-within:children:scale-110 children:children:outline-none hover:children:not-focus-within:translate-y--2 hover:children:not-focus-within:scale-110"
                key={index}
              >
                {child.props.children}
              </ul>
            );
          }
          return child;
        })}
    </section>
  );
};
