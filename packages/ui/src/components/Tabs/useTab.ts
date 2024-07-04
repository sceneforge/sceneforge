import { type MouseEvent, useCallback } from "react";

import type { TabCloseCallback } from "./TabPanel";

export type UseTabProps = {
  afterClose?: TabCloseCallback;
  beforeClose?: TabCloseCallback;
  id: string;
  onTabChange?: (id: string) => void;
  onTabClose?: (id: string) => void;
};

export const useTab = ({
  afterClose,
  beforeClose,
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
    if (beforeClose) {
      Promise.resolve(beforeClose()).then(() => {
        onTabClose?.(id);
        return afterClose?.();
      })
        .catch((error: unknown) => {
          throw new Error(`Tab ${id}: Error closing tab`, {
            cause: { error, id },
          });
        });
    }
    else {
      onTabClose?.(id);
      Promise.resolve(afterClose?.()).catch((error: unknown) => {
        throw new Error(`Tab ${id}: Error closing tab`, {
          cause: { error, id },
        });
      });
    }
  }, [afterClose, beforeClose, id, onTabClose]);

  return {
    handleTabChange,
    handleTabClose,
  };
};
