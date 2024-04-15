import { useMemo, useRef } from "react";
import { Button, type ButtonComponent, type ButtonProps } from "../Button";
import { Icon, type IconProps } from "../Icon";
import { variantBgClass } from "../../lib/variantClasses";
import { cls } from "../../lib/cls";

export type HeroIconButtonProps = Omit<ButtonProps, "children"> & {
  icon: IconProps["icon"];
};

export const HeroIconButton = ({
  icon,
  variant,
  ...props
}: HeroIconButtonProps) => {
  const buttonRef = useRef<ButtonComponent>(null);

  const bg = useMemo(() => {
    return variantBgClass[
      Array.isArray(variant)
        ? buttonRef.current?.pressed
          ? variant[1]
          : variant[0]
        : variant
        ? variant
        : "default"
    ];
  }, [buttonRef, variant]);

  return (
    <Button
      ref={buttonRef}
      {...(props as ButtonProps)}
      className={cls(
        `${bg}:25`,
        "h-full flex-shrink animate-in cursor-pointer rounded-5 b-none shadow-white:50 shadow-inset outline-none ring-white:20 transition zoom-in-1/2 children:inline-block active:shadow-xl focus:shadow-2xl hover:shadow-2xl focus:ring-2 hover:ring-2 active:ring-white:50 children:transition children:active:scale-115 children:hover:scale-125"
      )}
    >
      <Icon icon={icon} variant={variant} size={25} />
    </Button>
  );
};
