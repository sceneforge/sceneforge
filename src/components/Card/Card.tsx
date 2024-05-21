import { type PropsWithChildren, useMemo } from "react";

import { cls } from "../../lib/cls";
import { variantBgClass } from "../../lib/variantClasses";
import { Variant } from "../../types/variants";
import { Action, ActionProps } from "../Action";

export type CardProps = PropsWithChildren<{
  actions?: ActionProps[];
  img?: string;
  title?: string;
  variant?: Variant;
  zoom?: keyof typeof classesImgZoom;
}>;

// @unocss-include
const classesImgZoom = {
  0: "w-full max-w-full m-block-0 m-inline-0",
  1: "w-150% max-w-150% m-block--10% m-inline--25%",
  2: "w-200% max-w-200% m-block--20% m-inline--50%",
  3: "w-250% max-w-250% m-block--30% m-inline--75%",
  4: "w-300% max-w-300% m-block--40% m-inline--100%",
} as const;

export const Card = ({
  actions,
  children,
  img,
  title,
  variant = "default",
  zoom = 0,
}: CardProps) => {
  const cardBgClass = useMemo(
    () =>
      variant && variantBgClass[variant]
        ? variantBgClass[variant]!
        : "bg-primary",
    [variant]
  );
  return (
    <div className="relative h-full w-full animate-in overflow-clip rounded-5 c-inherit zoom-in-1/2 dark:bg-black light:bg-white">
      {title && (
        <span
          className={cls(
            "block font-size-4 p-block-3 p-inline-4 c-inherit text-start",
            `${cardBgClass}:75`
          )}
        >
          {title}
        </span>
      )}
      {img && (
        <div className={`${cardBgClass}:35`}>
          <div className="relative w-full overflow-clip rounded-be-5 after:block dark:bg-black:20 light:bg-white:20 after:p-b-80% after:content-empty">
            <img
              alt={`Image of ${title}`}
              className={cls("absolute block", classesImgZoom[zoom])}
              src={img}
            />
          </div>
        </div>
      )}
      {children && (
        <div className={cls("w-full m-b-8 c-inherit", `${cardBgClass}:25`)}>
          {children}
        </div>
      )}
      {actions && actions.length > 0 && (
        <div
          className={cls(
            "flex flex-row justify-stretch gap-2 p-3 c-inherit",
            `${cardBgClass}:35`
          )}
        >
          {actions.map((props, index) => (
            <Action key={index} {...props} />
          ))}
        </div>
      )}
    </div>
  );
};
