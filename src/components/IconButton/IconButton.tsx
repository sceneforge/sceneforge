import {
  type ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Button,
  ButtonComponent,
  type ButtonProps,
  type ButtonToggleEvent,
  type ToggleProps,
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
> & IconToggleProps;

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
    if (pressed === true || pressed === "true") return true;
    if (pressed === false || pressed === "false") return false;
    return;
  }, [pressed]);
  const [pressedState, setPressedState] = useState(isPressed ?? false);

  const currentIcon = useMemo(() => {
    if (Array.isArray(icon)) {
      return icon[isPressed ? 1 : 0];
    }
    return icon;
  }, [icon, isPressed]);

  const currentSize = useMemo(() => {
    return Array.isArray(size) ? size[isPressed ? 1 : 0] : size;
  }, [isPressed, size]);

  const handleToggleEvent = useCallback(
    (event: ButtonToggleEvent) => {
      setPressedState(event.state === "pressed");
      if (onToggle) onToggle(event);
    },
    [onToggle]
  );

  useEffect(() => {
    if (isPressed === true) {
      setPressedState(true);
    }
    else if (isPressed === false) {
      setPressedState(false);
    }
  }, [isPressed]);

  const buttonProps = {
    ...(toggle
      ? {
        toggle: true,
        label,
        variant,
        pressed: pressedState,
        onToggle: handleToggleEvent,
      }
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
