import { useState, useCallback, useEffect } from "react";
import { type ModelProps } from "../ModelViewer";
import { useTabs } from "../../hooks/useTabs";
import { useModelContext } from "../ModelContext";

export type UseModelListProps = {
  active?: boolean;
};

export const useModelList = ({ active }: UseModelListProps) => {
  const [loaded, setLoaded] = useState(false);
  const { models, loadModels } = useModelContext();
  const { newModelViewTab, closeModelViewTab } = useTabs();

  const openModel = useCallback(
    (model: Partial<ModelProps> = {}) => {
      return () => {
        newModelViewTab(model);
      };
    },
    [newModelViewTab]
  );

  const deleteModel = useCallback(
    (model: ModelProps) => {
      return () => {
        console.log("delete", model);
        closeModelViewTab(model.id);
      };
    },
    [closeModelViewTab]
  );

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
    openModel,
    deleteModel,
  };
};
