import { cls } from "../../lib/cls";
import { type Variant } from "../../types/variants";
import { classes, type IconName } from "./classes";
import { variantTextClass } from "../../lib/variantClasses";
import { type AriaAttributes } from "react";

export type IconProps = AriaAttributes & {
  icon: IconName;
  size?: number;
  label?: string;
  variant?: Variant;
};

export const Icon = ({
  icon,
  label,
  variant,
  size = 4,
  ...props
}: IconProps) => {
  return (
    <span
      role="img"
      className={cls(
        "block",
        variant ? variantTextClass[variant] : "c-inherit",
        classes[icon],
        size
          ? [`w-${size} min-w-${size}`, `h-${size} min-h-${size}`]
          : ["w-4 min-w-4", "h-4 min-h-4"]
      )}
      {...props}
    />
  );
};
