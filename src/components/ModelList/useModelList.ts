import { useState, useEffect } from "react";
import { useModelContext } from "../ModelContext";

export type UseModelListProps = {
  active?: boolean;
};

export const useModelList = ({ active }: UseModelListProps) => {
  const [loaded, setLoaded] = useState(false);
  const { models, loadModels } = useModelContext();

  useEffect(() => {
    if (!active) {
      setLoaded(false);
    }
  }, [active, setLoaded]);

  useEffect(() => {
    if (!loaded && active) {
      loadModels()
        .then(() => {
          setLoaded(true);
        })
        .catch((err: unknown) => {
          setLoaded(true);
          throw new Error("Failed to load models", { cause: err });
        });
    }
  }, [loaded, active, loadModels, setLoaded]);

  return {
    models,
  };
};
