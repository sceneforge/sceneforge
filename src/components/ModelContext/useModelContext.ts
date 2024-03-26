import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ModelContext } from "./ModelContextProvider";
import { usePanel } from "../Panel";
import { Model, isModel } from "../../lib/isModel";

export const useModelContext = ({ id }: Partial<Model> = {}) => {
  const { models, loaded, setModels, setLoaded, loadState, setLoadState } =
    useContext(ModelContext);
  const { getAllUserData, setUserData, removeUserData } = usePanel();

  const [currentID, setCurrentID] = useState<string | undefined>(id);

  const loadModels = useCallback((): Promise<Model[]> => {
    setLoadState("loading");
    return new Promise((resolve, reject) => {
      getAllUserData(
        "models",
        (data) => {
          setModels([]);
          if (Array.isArray(data)) {
            for (const model of data) {
              if (isModel(model)) {
                setModels((prev) => [...prev, model]);
              }
            }
          }
          setLoaded(true);
          setLoadState("loaded");
          resolve(models);
        },
        (error) => {
          setLoadState("error");
          if (error instanceof Error) {
            reject(error);
          } else {
            reject(new Error("Failed to load models", { cause: error }));
          }
        }
      );
    });
  }, [setLoadState, getAllUserData, setModels, setLoaded, models]);

  const getModel = useCallback(
    async (id?: string): Promise<Model | undefined> => {
      if (!id) return undefined;
      if (loaded) {
        return models.find((model) => model.id === id);
      } else {
        return (await loadModels()).find((model) => model.id === id);
      }
    },
    [models, loaded, loadModels]
  );

  const saveModel = useCallback(
    (model: Model) => {
      setModels((prev) => prev.filter((m) => m.id !== model.id).concat(model));
      return setUserData("models", model.id, model);
    },
    [setModels, setUserData]
  );

  const deleteModel = useCallback(
    (id: string) => {
      setModels((prev) => prev.filter((m) => m.id !== id));
      removeUserData("models", id);
    },
    [setModels, removeUserData]
  );

  const updateModel = useCallback(
    async (
      id: string,
      model: Partial<Omit<Model, "id" | "createdAt" | "updatedAt">>
    ): Promise<Model | undefined> => {
      const currentModel = await getModel(id);
      if (currentModel) {
        const now = new Date();
        saveModel({ ...currentModel, ...model, updatedAt: now });
        return { ...currentModel, ...model, updatedAt: now };
      }
      return undefined;
    },
    [getModel, saveModel]
  );

  const currentModel = useMemo(() => {
    if (currentID) {
      return models.find((model) => model.id === currentID);
    }
    return undefined;
  }, [currentID, models]);

  useEffect(() => {
    if (id && loadState === "none") {
      loadModels();
    }
  }, [id, loadState, loadModels]);

  return {
    models,
    currentID,
    setCurrentID,
    currentModel,
    loadState,
    loadModels,
    getModel,
    saveModel,
    updateModel,
    deleteModel,
  };
};
