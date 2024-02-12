import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './ButtonMenu.module.css';

export type ButtonMenuProps = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "className" | "type"> & {
  menuOpen?: boolean;
};

export const ButtonMenu = ({ menuOpen, ...props }: ButtonMenuProps) => {
  return (
    <button type="button" className={styles.wrapper} {...props} aria-label="Menu" aria-checked={menuOpen ? "true" : "false"}>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
  );
}