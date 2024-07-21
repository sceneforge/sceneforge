import { useCallback, useId, useMemo, useRef } from "react";

export type UseFigureButtonDialogProps = {
  id?: string;
};

export const useFigureButtonDialog = ({
  id,
}: UseFigureButtonDialogProps) => {
  const generatedId = useId();
  const currentId = id || generatedId;

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
