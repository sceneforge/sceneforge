import { type ForwardedRef, type HTMLAttributes, forwardRef } from "react";

import { cls } from "../../lib/cls";
import { variantTextClass } from "../../lib/variantClasses";
import { type Variant } from "../../types/variants";
import { type IconName, classes } from "./classes";

export type IconProps = {
  className?: string;
  icon: IconName;
  size?: number;
  variant?: Variant;
} & HTMLAttributes<HTMLSpanElement>;

export const Icon = forwardRef(function Icon(
  { className, icon, size = 4, variant, ...props }: IconProps,
  ref: ForwardedRef<HTMLSpanElement>
) {
  return (
    <span
      {...props}
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
      ref={ref}
      role="img"
    />
  );
});
