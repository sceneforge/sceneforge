import {
  type ForwardedRef,
  type HTMLAttributes,
  type PropsWithChildren,
  forwardRef,
} from "react";

import { cls } from "../../lib/cls";
import { Heading } from "../Heading";

export type SectionProps = HTMLAttributes<HTMLElement> &
  PropsWithChildren<{
    headingClassName?: HTMLAttributes<HTMLHeadingElement>["className"];
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    title?: string;
  }>;

export const Section = forwardRef(function Section(
  { children, className, headingClassName, level = 2, title }: SectionProps,
  ref: ForwardedRef<HTMLElement>
) {
  return (
    <section className="text-start c-light" ref={ref}>
      {title && (
        <Heading
          className={cls(
            headingClassName
            ?? "w-full lg:w-3xl sm:w-lg xl:w-6xl m-inline-auto m-b-4 m-t-0 c-inherit text-start text-shadow-xl"
          )}
          level={level}
        >
          {title}
        </Heading>
      )}
      <div
        className={
          className
          ?? "c-inherit w-full lg:w-3xl sm:w-lg xl:w-6xl m-inline-auto"
        }
      >
        {children}
      </div>
    </section>
  );
});
