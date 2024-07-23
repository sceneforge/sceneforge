import { useCallback, useMemo, useRef } from "react";

import { useCurrentId } from "../../hooks";

export type UseFigureButtonDialogProps = {
  id?: string;
};

export const useFigureButtonDialog = ({
  id,
}: UseFigureButtonDialogProps) => {
  const currentId = useCurrentId(id);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const currentDialogId = useMemo(() => `${currentId}-dialog`, [currentId]);

  const handleImageButtonClick = useCallback(() => {
    dialogRef.current?.showModal();
  }, [dialogRef]);

  return {
    currentDialogId,
    currentId,
    dialogRef,
    handleImageButtonClick,
  };
};
