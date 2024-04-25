import { type ComponentType } from "react";
import { type Element } from "hast";
import { type MarkdownProps } from "@simplecomponent/markdown";
import { Heading } from "../Heading";
import { Link } from "../Link";
import { Image } from "../Image";
import { Blockquote } from "../Blockquote";

type IntrinsicElement<
  T extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = JSX.IntrinsicElements[T];

const wrapper =
  <
    T extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
    WP extends object = object,
    P extends IntrinsicElement<T> = IntrinsicElement<T>,
  >(
    Component: ComponentType<WP>,
    initialProps: WP = {} as WP,
  ) =>
  ({ node, ...props }: P & { node?: Element }) =>
    node && node.type === "element" ? (
      <Component {...props} {...initialProps} />
    ) : null;

export const components: MarkdownProps["components"] = {
  h1: wrapper(Heading, { level: 1 }),
  h2: wrapper(Heading, { level: 2 }),
  h3: wrapper(Heading, { level: 3 }),
  h4: wrapper(Heading, { level: 4 }),
  h5: wrapper(Heading, { level: 5 }),
  h6: wrapper(Heading, { level: 6 }),
  a: wrapper(Link, { target: "_blank", rel: "nofollow" }),
  img: wrapper(Image),
  blockquote: wrapper(Blockquote),
};
