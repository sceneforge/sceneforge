import { useCallback, type RefObject } from "react";

export const useMeshTree = (ref: RefObject<HTMLDivElement>) => {
  const closeAll = useCallback(() => {
    if (ref.current) {
      const detailsElements = ref.current.querySelectorAll("details[open]");
      for (const details of detailsElements) {
        details.removeAttribute("open");
      }
    }
  }, [ref]);

  return {
    closeAll
  }
}