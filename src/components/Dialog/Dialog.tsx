import {
  type ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type DialogHTMLAttributes,
  type PropsWithChildren,
  Fragment,
  useEffect,
  useId,
} from "react";
import { IconButton, type IconButtonProps } from "../IconButton";
import { Button, type ButtonProps } from "../Button";

export type DialogProps = PropsWithChildren<{
  title?: string;
  description?: string;
  actions?: (IconButtonProps | ButtonProps)[];
}> &
  DialogHTMLAttributes<HTMLDialogElement>;

export const Dialog = forwardRef(function Dialog(
  {
    title,
    description,
    open,
    onClose,
    onCancel,
    actions,
    children,
    ...props
  }: DialogProps,
  forwardedRef: ForwardedRef<HTMLDialogElement | null>
) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const headId = useId();
  const descriptionId = useId();

  useImperativeHandle(
    forwardedRef,
    () => dialogRef.current as HTMLDialogElement,
    [dialogRef]
  );

  const handleCloseClick = useCallback(() => {
    dialogRef.current?.close();
  }, [dialogRef]);

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [open, dialogRef]);

  return (
    <dialog
      className="fixed inset-block-50% inset-inline-50% m-0 flex flex-col translate--50% b b-accent rounded-4 b-solid p-0 drop-shadow-2xl backdrop:bg-accent:10 dark:bg-black light:bg-white dark:text-light light:text-dark backdrop:backdrop-blur-2 backdrop:backdrop-grayscale-60 backdrop:backdrop-filter"
      ref={dialogRef}
      onClose={onClose}
      onCancel={onCancel}
      aria-labelledby={headId}
      aria-describedby={description && descriptionId}
      {...props}
    >
      <div className="w-full flex flex-shrink flex-row flex-nowrap select-none justify-stretch gap-2 b-b b-b-black:20 b-b-solid bg-accent:75 p-2">
        <h1
          id={headId}
          className="m-0 flex-grow p-0 text-start text-nowrap text-size-sm"
        >
          {title}
        </h1>
        <IconButton
          autoFocus
          label="Close"
          icon="close"
          onClick={handleCloseClick}
        />
      </div>
      <div
        role="document"
        tabIndex={0}
        className="flex flex-grow flex-col justify-stretch bg-accent:40 text-start text-size-sm"
      >
        <div className="m-b p-2">
          {description && (
            <p className="m-0" id={descriptionId}>
              {description}
            </p>
          )}
          {children && (
            <div role={description ? "complementary" : undefined}>
              {children}
            </div>
          )}
        </div>
        {actions && actions.length > 0 && (
          <div className="w-full flex flex-row items-center justify-center bg-accent:50 p-2 text-center">
            {actions.map((props, index) => (
              <Fragment key={index}>
                {"icon" in props && props.icon ? (
                  <IconButton {...(props as IconButtonProps)} />
                ) : (
                  <Button variant="accent" {...(props as ButtonProps)} />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
});
