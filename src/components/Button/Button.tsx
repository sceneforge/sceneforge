import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./Button.module.css";

export type ButtonProps = Omit<DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
>, "type"> & {
  clear?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "none" | "default" | "accent" | "danger" | "warning" | "success" | "info" | "inverted";
};

export const Button = ({
  clear,
  size,
  children,
  variant = "none",
  className,
  ...props
}: ButtonProps) => {
  const classNames = [styles.wrapper, className].filter(Boolean).join(" ");
  return (
    <button
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
};
