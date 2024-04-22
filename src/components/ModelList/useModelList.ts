import { useState, useCallback, useEffect } from "react";
import { useTabs } from "../../hooks/useTabs";
import { useModelContext } from "../ModelContext";

export type UseModelListProps = {
  active?: boolean;
};

export const useModelList = ({ active }: UseModelListProps) => {
  const [loaded, setLoaded] = useState(false);
  const { models, loadModels } = useModelContext();
  const { newModelViewTab } = useTabs();

  const openNewModel = useCallback(() => {
    newModelViewTab({});
  }, [newModelViewTab]);

  useEffect(() => {
    if (!active) {
      setLoaded(false);
    }
  }, [active, setLoaded]);

  useEffect(() => {
    if (!loaded && active) {
      loadModels();
      setLoaded(true);
    }
  }, [loaded, active, loadModels, setLoaded]);

  return {
    models,
    openNewModel,
  };
};
