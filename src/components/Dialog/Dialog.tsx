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
      className="fixed flex flex-col p-0 m-0 inset-inline-50% inset-block-50% translate--50% light:bg-white dark:bg-black light:text-dark dark:text-light rounded-4 b b-solid b-accent drop-shadow-2xl backdrop:backdrop-filter backdrop:backdrop-blur-2 backdrop:backdrop-grayscale-60 backdrop:bg-accent:10"
      ref={dialogRef}
      onClose={onClose}
      onCancel={onCancel}
      aria-labelledby={headId}
      aria-describedby={description && descriptionId}
      {...props}
    >
      <div className="select-none flex-shrink w-full flex flex-row flex-nowrap justify-stretch p-2 gap-2 bg-accent:75 b-b b-b-solid b-b-black:20">
        <h1
          id={headId}
          className="p-0 m-0 flex-grow text-size-sm text-nowrap text-start"
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
        className="flex-grow flex flex-col justify-stretch bg-accent:40 text-size-sm text-start"
      >
        <div className="p-2 m-b">
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
          <div className="w-full flex flex-row justify-center items-center p-2 bg-accent:50 text-center">
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
