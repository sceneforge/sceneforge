import { useEffect, useState } from "react";

import { useModelContext } from "../ModelContext";

export type UseModelListProps = {
  active?: boolean;
};

export const useModelList = ({ active }: UseModelListProps) => {
  const [loaded, setLoaded] = useState(false);
  const { loadModels, models } = useModelContext();

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
        .catch((error) => {
          setLoaded(true);
          throw new Error("Failed to load models", { cause: error });
        });
    }
  }, [loaded, active, loadModels, setLoaded]);

  return {
    models,
  };
};
