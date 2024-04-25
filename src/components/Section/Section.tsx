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
    title?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    headingClassName?: HTMLAttributes<HTMLHeadingElement>["className"];
  }>;

export const Section = forwardRef(function Section(
  { title, level = 2, className, headingClassName, children }: SectionProps,
  ref: ForwardedRef<HTMLElement>,
) {
  return (
    <section ref={ref} className="text-start c-light">
      {title && (
        <Heading
          level={level}
          className={cls(
            headingClassName ??
              "w-full lg:w-3xl sm:w-lg xl:w-6xl m-inline-auto m-b-4 m-t-0 c-inherit text-start text-shadow-xl",
          )}
        >
          {title}
        </Heading>
      )}
      <div
        className={
          className ??
          "c-inherit w-full lg:w-3xl sm:w-lg xl:w-6xl m-inline-auto"
        }
      >
        {children}
      </div>
    </section>
  );
});
