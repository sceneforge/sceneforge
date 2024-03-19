import {
  type ForwardedRef,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Button,
  type ButtonToggleEvent,
  type ButtonProps,
  type ToggleProps,
  ButtonComponent,
} from "../Button";
import { Icon, type IconProps } from "../Icon";

export type IconToggleProps = ToggleProps<
  {
    icon: IconProps["icon"] | [IconProps["icon"], IconProps["icon"]];
    size?: IconProps["size"] | [IconProps["size"], IconProps["size"]];
  },
  Omit<IconProps, "label">
>;

export type IconButtonProps = Omit<
  ButtonProps,
  "children" | keyof ToggleProps
> &
  IconToggleProps;

export const IconButton = forwardRef(function IconButton(
  {
    toggle,
    pressed,
    onToggle,
    icon,
    size,
    grow = false,
    shrink = true,
    inverted = true,
    label,
    variant,
    ...props
  }: IconButtonProps,
  ref: ForwardedRef<ButtonComponent>
) {
  const isPressed = useMemo(() => {
    if (!toggle) return false;
    if (typeof pressed === "boolean") return pressed;
    if (typeof pressed === "string") return pressed === "true";
    return false;
  }, []);

  const [currentIcon, setCurrentIcon] = useState<IconProps["icon"]>(
    Array.isArray(icon) ? icon[isPressed ? 1 : 0] : icon
  );
  const [currentSize, setCurrentSize] = useState<IconProps["size"]>(
    Array.isArray(size) ? size[isPressed ? 1 : 0] : size
  );

  const handleToggleEvent = useCallback(
    (e: ButtonToggleEvent) => {
      if (e.state === "pressed") {
        if (Array.isArray(icon)) {
          setCurrentIcon(icon[1]);
        }
        if (Array.isArray(size)) {
          setCurrentSize(size[1]);
        }
      } else {
        if (Array.isArray(icon)) {
          setCurrentIcon(icon[0]);
        }
        if (Array.isArray(size)) {
          setCurrentSize(size[0]);
        }
      }
      if (onToggle) onToggle(e);
    },
    [icon, size, onToggle, setCurrentIcon, setCurrentSize]
  );

  const buttonProps = {
    ...(toggle
      ? { toggle: true, label, variant, pressed, onToggle: handleToggleEvent }
      : { label, variant }),
    ...props,
  } as ButtonProps;

  return (
    <Button
      {...buttonProps}
      grow={grow}
      shrink={shrink}
      inverted={inverted}
      ref={ref}
    >
      <Icon icon={currentIcon} size={currentSize} aria-hidden />
    </Button>
  );
});
