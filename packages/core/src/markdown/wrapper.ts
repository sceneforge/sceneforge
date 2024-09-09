import { type Element } from "hast";
import { type ComponentType, createElement, type JSX } from "react";

type IntrinsicElement<
  T extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = JSX.IntrinsicElements[T];

/**
 * The component wrapper for the markdown renderer.
 *
 * @param Component The React Component to wrap
 * @param initialProps The initial properties to pass to the component
 * @returns A React Component that will render the given component with the
 * given initial propertiess if the node type is "element", otherwise it will
 * return null
 */
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
