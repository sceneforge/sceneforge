import { Ref, useCallback, useEffect, useId, useImperativeHandle, useRef, useState } from "react";

export type UseDialogProps = {
  open?: boolean;
  ref?: Ref<HTMLDialogElement>;
};

export const useDialog = ({ open, ref }: UseDialogProps) => {
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

  return {
    descriptionId,
    dialogRef,
    handleCloseClick,
    headId,
  };
};
