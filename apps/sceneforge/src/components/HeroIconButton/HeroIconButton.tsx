import { Button, type ButtonProps, Icon, type IconProps } from "@sceneforge/ui";

export type HeroIconButtonProps = {
  icon: IconProps["icon"];
} & Omit<ButtonProps, "children">;

export const HeroIconButton = ({
  icon,
  ...props
}: HeroIconButtonProps) => {
  return (
    <Button {...(props as ButtonProps)}>
      <Icon icon={icon} size={25} />
    </Button>
  );
};
