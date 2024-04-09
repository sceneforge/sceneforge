import { useMemo, useRef } from "react";
import { Button, type ButtonComponent, type ButtonProps } from "../Button";
import { Icon, type IconProps } from "../Icon";
import { variantBgClass } from "../../lib/variantClasses";

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
      className={`${bg}:25 animate-in zoom-in-1/2 h-full flex-shrink cursor-pointer rounded-5 b-none children:inline-block`}
    >
      <Icon icon={icon} variant={variant} size={25} />
    </Button>
  );
};
