import { v4 as uuid } from "uuid";
import { type ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef, type DialogHTMLAttributes, type PropsWithChildren, Fragment, useEffect } from "react";
import styles from "./Dialog.module.css";
import { IconButton, type IconButtonProps } from "../IconButton";
import { Button, type ButtonProps } from "../Button";

export type DialogProps = PropsWithChildren<{
  title?: string;
  description?: string;
  actions?: (IconButtonProps | ButtonProps)[],
}> & DialogHTMLAttributes<HTMLDialogElement>

export const Dialog = forwardRef(function Dialog({
  id = `dialog-${uuid()}`,
  title,
  description,
  open,
  onClose,
  onCancel,
  actions,
  children,
  ...props
}: DialogProps, forwardedRef: ForwardedRef<HTMLDialogElement | null>) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(forwardedRef, () => dialogRef.current as HTMLDialogElement, [dialogRef]);

  const handleCloseClick = useCallback(() => {
    dialogRef.current?.close();
  }, [dialogRef])

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [open, dialogRef]);

  return (
    <dialog
      id={id}
      className={styles.wrapper}
      ref={dialogRef}
      onClose={onClose}
      onCancel={onCancel}
      aria-labelledby={`${id}-title`}
      aria-describedby={description && `${id}-description`}
      {...props}
    >
      <div className={styles.title}>
        <h1 id={`${id}-title`}>{title}</h1>
        <IconButton
          autoFocus
          aria-label="Close"
          icon="close"
          onClick={handleCloseClick}
        />
      </div>
      <div role="document" tabIndex={0}>
        <div className={styles.content}>
          {description && (
            <p id={`${id}-description`}>{description}</p>
          )}
          {children && (
            <div
              role={description ? "complementary" : undefined}
            >
              {children}
            </div>
          )}
        </div>
        {actions && actions.length > 0 && (
          <div className={styles.actions}>
            {actions.map((props, index) => (
              <Fragment key={index}>
                {"icon" in props && props.icon ? (
                  <IconButton {...props as IconButtonProps} />
                ) : (
                  <Button {...props as ButtonProps} />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
});