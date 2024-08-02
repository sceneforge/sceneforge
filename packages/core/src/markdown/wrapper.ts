import { type Element } from "hast";
import { type ComponentType, createElement, type JSX } from "react";

type IntrinsicElement<
  T extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = JSX.IntrinsicElements[T];

export const wrapper
  = <
    T extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
    WP extends object = object,
    P extends IntrinsicElement<T> = IntrinsicElement<T>,
  >(
    Component: ComponentType<WP>,
    initialProps: WP = {} as WP
  ) =>
    ({ node, ...props }: { node?: Element } & P) => {
      return node && node.type === "element"
        ? createElement(Component, {
          ...props,
          ...initialProps,
        })
        : null;
    };
