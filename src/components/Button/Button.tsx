import { ForwardedRef, forwardRef, type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";
import styles from "./Button.module.css";

export type ButtonProps = Omit<DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
>, "type"> & {
  clear?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  variant?: "none" | "default" | "accent" | "danger" | "warning" | "success" | "info" | "inverted";
  popovertarget?: string;
};

export const Button = forwardRef(function Button({
  clear,
  size,
  children,
  variant = "none",
  className,
  ...props
}: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const classNames = [styles.wrapper, className].filter(Boolean).join(" ");
  return (
    <button
      ref={ref}
      className={classNames}
      data-clear={clear ? "true" : "false"}
      data-size={size}
      data-variant={variant}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
});
