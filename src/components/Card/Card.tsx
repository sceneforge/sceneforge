import { useMemo, type PropsWithChildren } from "react";
import { Action, ActionProps } from "../Action";
import { cls } from "../../lib/cls";
import { Variant } from "../../types/variants";
import { variantBgClass } from "../../lib/variantClasses";

export type CardProps = PropsWithChildren<{
  title?: string;
  img?: string;
  zoom?: keyof typeof classesImgZoom;
  actions?: ActionProps[];
  variant?: Variant;
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
  img,
  zoom = 0,
  title,
  actions,
  variant = "default",
  children,
}: CardProps) => {
  const cardBgClass = useMemo(
    () =>
      variant && variantBgClass[variant]
        ? variantBgClass[variant]!
        : "bg-primary",
    [variant]
  );
  return (
    <div className="relative w-full overflow-clip rounded-5 c-inherit dark:bg-black light:bg-white">
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
              className={cls("absolute block", classesImgZoom[zoom])}
              alt={`Image of ${title}`}
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
            "h-20 flex flex-row justify-stretch gap-2 p-4 c-inherit",
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
