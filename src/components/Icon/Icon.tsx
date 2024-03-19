import { cls } from "../../lib/cls";
import { type Variant } from "../../types/variants";
import { classes, type IconName } from "./classes";
import { variantTextClass } from "../../lib/variantClasses";
import { type ForwardedRef, type HTMLAttributes, forwardRef } from "react";

export type IconProps = HTMLAttributes<HTMLSpanElement> & {
  icon: IconName;
  size?: number;
  variant?: Variant;
  className?: string;
};

export const Icon = forwardRef(function Icon(
  { icon, variant, size = 4, className, ...props }: IconProps,
  ref: ForwardedRef<HTMLSpanElement>
) {
  return (
    <span
      {...props}
      ref={ref}
      role="img"
      className={cls(
        classes[icon],
        className ?? [
          "block",
          variant ? variantTextClass[variant] : "c-inherit",
          ...(size
            ? [`w-${size} min-w-${size}`, `h-${size} min-h-${size}`]
            : ["w-4 min-w-4", "h-4 min-h-4"]),
        ]
      )}
    />
  );
});
