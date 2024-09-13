import { type Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";

import { useCurrentId } from "../../hooks";

export type UseDialogProps = {
  id?: string;
  open?: boolean;
  ref?: Ref<HTMLDialogElement>;
};

export const useDialog = ({ id, open, ref }: UseDialogProps) => {
  const [openState, setOpenState] = useState<boolean>(open ?? false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const currentId = useCurrentId(id);
  const headId = useMemo(() => `${currentId}-dialog-head`, [currentId]);
  const descriptionId = useMemo(() => `${currentId}-dialog-description`, [currentId]);

  // eslint-disable-next-line react-compiler/react-compiler
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
    currentId,
    descriptionId,
    dialogRef,
    handleCloseClick,
    headId,
  };
};
