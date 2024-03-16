import {
  type ForwardedRef,
  type HTMLAttributes,
  type PropsWithChildren,
  forwardRef,
  createElement,
} from "react";
import { cls } from "../../lib/cls";

export type SectionProps = HTMLAttributes<HTMLElement> &
  PropsWithChildren<{
    title?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    headingClassName?: HTMLAttributes<HTMLHeadingElement>["className"];
  }>;

export const Section = forwardRef(function Section(
  { title, level = 2, className, headingClassName, children }: SectionProps,
  ref: ForwardedRef<HTMLElement>
) {
  const titleElement = title
    ? createElement(
        `h${level}`,
        {
          className: cls(
            headingClassName ??
              "m-b-4 m-t-0 c-inherit text-start text-shadow-xl"
          ),
        },
        title
      )
    : null;

  return (
    <section ref={ref} className="c-light">
      {titleElement}
      <div className={className}>{children}</div>
    </section>
  );
});
