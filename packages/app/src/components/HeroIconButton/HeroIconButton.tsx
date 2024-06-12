import { Button, type ButtonProps, Icon, type IconProps } from "@sceneforge/ui";

import { cls } from "../../lib/cls";

export type HeroIconButtonProps = {
  icon: IconProps["icon"];
} & Omit<ButtonProps, "children">;

export const HeroIconButton = ({
  icon,
  ...props
}: HeroIconButtonProps) => {
  return (
    <Button
      {...(props as ButtonProps)}
      className={cls(
        "h-full flex-shrink animate-in cursor-pointer rounded-5 b-none shadow-white:50 shadow-inset outline-none ring-white:20 transition zoom-in-1/2 children:inline-block active:shadow-xl focus:shadow-2xl hover:shadow-2xl focus:ring-2 hover:ring-2 active:ring-white:50 children:transition children:active:scale-115 children:hover:scale-125"
      )}
    >
      <Icon icon={icon} size={25} />
    </Button>
  );
};
