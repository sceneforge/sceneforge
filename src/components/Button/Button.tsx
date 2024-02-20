import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./Button.module.css";

export type ButtonProps = Omit<DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
>, "className" | "type"> & {
  clear?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export const Button = ({ clear, size, children, ...props }: ButtonProps) => {
  return (
    <button
      className={styles.wrapper}
      data-clear={clear ? "true" : "false"}
      data-size={size}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
