import styles from './IconMenu.module.css';

export interface IconMenuProps {
  open?: boolean;
}

export const IconMenu = ({ open }: IconMenuProps) => {
  return (
    <span aria-hidden="true" className={styles.wrapper} data-open={open ? "true" : "false"}>
      <span aria-hidden="true"></span>
    </span>
  )
}