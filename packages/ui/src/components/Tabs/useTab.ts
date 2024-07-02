import { type MouseEvent, useCallback } from "react";

export type UseTabProps = {
  id: string;
  onTabChange?: (id: string) => void;
  onTabClose?: (id: string) => void;
};

export const useTab = ({
  id,
  onTabChange,
  onTabClose,
}: UseTabProps) => {
  const handleTabChange = useCallback((
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    onTabChange?.(id);
  }, [onTabChange, id]);

  const handleTabClose = useCallback((
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    onTabClose?.(id);
  }, [onTabClose, id]);

  return {
    handleTabChange,
    handleTabClose,
  };
};
