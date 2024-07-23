import { useId, useMemo } from "react";

export const useCurrentId = (id?: string) => {
  const generatedId = useId();

  return useMemo(() => id ?? generatedId, [generatedId, id]);
};
