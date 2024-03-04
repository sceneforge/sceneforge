import { Fragment, type MouseEventHandler, type PropsWithChildren } from "react";
import { Button, type ButtonProps } from "../Button";
import { type IconProps } from "../Icon";
import { IconButton } from "../IconButton";
import styles from "./Card.module.css";

export interface CardActionProps {
  label: string;
  icon?: IconProps["icon"];
  variant?: ButtonProps["variant"];
  onClick?: MouseEventHandler<HTMLElement>;
}

export type CardProps = PropsWithChildren<{
  title?: string;
  img?: string;
  actions?: CardActionProps[];
}>;

export const Card = ({ img, title, actions, children }: CardProps) => {
  return (
    <div className={styles.wrapper}>
      {title && <span className={styles.title}>{title}</span>}
      {img && <div className={styles.img}><img alt={`Image of ${title}`} src={img} /></div>}
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}
      {actions && actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map(({ label, icon, onClick, variant = "default" }, index) => (
            <Fragment key={index}>
              {icon ? (
                <IconButton icon={icon} title={label} variant={variant} onClick={onClick} />
              ) : (
                <Button size="full" title={label} variant={variant} onClick={onClick}>
                  {label}
                </Button>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
