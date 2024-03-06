import { type IconName, type IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { Fragment, type PropsWithChildren } from "react";
import { Button, type ButtonProps } from "../Button";
import { H2 } from "../Heading";
import { IconButton } from "../IconButton";
import styles from "./PanelSheetSection.module.css";

type PanelSheetSectionAction = {
  label?: string;
  onClick?: ButtonProps["onClick"];
  icon?: IconName;
  prefix?: IconPrefix;
}

export type PanelSheetSectionProps = PropsWithChildren<{
  title?: string,
  className?: string,
  actions?: PanelSheetSectionAction[]
}>;

export const PanelSheetSection = ({
  title,
  className,
  actions,
  children
}: PanelSheetSectionProps) => {
  const classNames = [styles.wrapper, className].filter(Boolean).join(" ");
  return (
    <section className={classNames}>
      <div className={styles.title}>
        {title && <H2 text={title} />}
        {actions && actions.length > 0 && (
          <div className={styles.actions}>
            {actions.map(({ icon, prefix, onClick, label }, index) => (
              <Fragment key={index}>
                {icon && (<IconButton icon={icon} prefix={prefix} onClick={onClick} title={label} />)}
                {!icon && label && (<Button clear onClick={onClick}>{label}</Button>)}
              </Fragment>
            ))}
          </div>
        )}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </section>
  )
}