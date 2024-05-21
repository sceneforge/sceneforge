import {
  type DialogHTMLAttributes,
  type ForwardedRef,
  type PropsWithChildren,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { IconButton } from "../IconButton";
import { Heading } from "../Heading";
import { Toolbar, type ToolbarProps } from "../Toolbar";
import { Variant } from "../../types/variants";
import { variantBgClass } from "../../lib/variantClasses";
import { cls } from "../../lib/cls";

export type DialogProps = PropsWithChildren<{
  title?: string;
  description?: string;
  toolbar?: ToolbarProps;
  variant?: Variant;
  extendedClassName?: string;
}> &
DialogHTMLAttributes<HTMLDialogElement>;

export const Dialog = forwardRef(function Dialog(
  {
    title,
    description,
    open = true,
    onClose,
    onCancel,
    children,
    toolbar,
    variant = "accent",
    extendedClassName,
    ...props
  }: DialogProps,
  ref: ForwardedRef<HTMLDialogElement>
) {
  const [openState, setOpenState] = useState<boolean>(open ?? false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headId = useId();
  const descriptionId = useId();

  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement, [
    dialogRef,
  ]);

  const handleCloseClick = useCallback(() => {
    if (dialogRef.current instanceof HTMLDialogElement) {
      setOpenState(false);
      dialogRef.current.close();
    }
  }, [dialogRef]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (openState && dialog) {
      dialog.showModal();
      return () => {
        dialog.close();
      };
    }
  }, [openState, dialogRef]);

  return (
    <dialog
      className={cls(
        "fixed inset-block-50% inset-inline-50% m-0 min-w-64 flex flex-col translate--50% overflow-clip b dark:b-black:10 light:b-white:10 rounded-4 b-solid bg-accent p-0 c-light drop-shadow-2xl backdrop:h-full backdrop:w-full backdrop:bg-accent:10 backdrop:backdrop-blur-2 backdrop:backdrop-grayscale-60 backdrop:backdrop-filter",
        variantBgClass[variant],
        extendedClassName
      )}
      onClose={onClose}
      onCancel={onCancel}
      aria-labelledby={headId}
      aria-describedby={description && descriptionId}
      {...props}
      ref={dialogRef}
    >
      <div className="w-full flex flex-shrink flex-row flex-nowrap select-none items-center justify-stretch gap-2 b-b b-b-black:20 b-b-solid p-2 dark:bg-black:10 light:bg-white:10">
        <Heading
          level={1}
          id={headId}
          className="m-0 flex-grow p-0 text-start text-nowrap font-size-4"
        >
          {title}
        </Heading>
        <IconButton
          className="m-0 block cursor-pointer b-0 rounded-full bg-transparent p-1 c-inherit hover:dark:bg-black:10 hover:light:bg-white:10"
          autoFocus
          label="Close"
          icon="close"
          onClick={handleCloseClick}
        />
      </div>
      <div
        role="document"
        className="flex flex-grow flex-col justify-stretch text-start text-size-sm dark:bg-black:25 light:bg-white:25"
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
        {toolbar && toolbar.items && toolbar.items.length > 0 && (
          <div className="w-full flex flex-row items-center justify-center p-2 text-center dark:bg-black:10 light:bg-white:10">
            <Toolbar contrast withDropdown={false} {...toolbar} />
          </div>
        )}
      </div>
    </dialog>
  );
});
