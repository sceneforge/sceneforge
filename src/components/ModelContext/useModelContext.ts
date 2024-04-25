import { v4 as uuid } from "uuid";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ModelContext } from "./ModelContextProvider";
import { usePanel } from "../Panel";
import { Model, isModel } from "../../lib/isModel";
import { useTranslation } from "react-i18next";

export const useModelContext = ({ id, capture }: Partial<Model> = {}) => {
  const { t } = useTranslation("common");
  const { models, loaded, setModels, setLoaded, loadState, setLoadState } =
    useContext(ModelContext);
  const { getAllUserData, setUserData, removeUserData } = usePanel();

  const [currentID, setCurrentID] = useState<string | undefined>(id);
  const [captureSaveState, setCaptureSaveState] = useState<boolean | undefined>(
    false,
  );

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
        },
      );
    });
  }, [setLoadState, getAllUserData, setModels, setLoaded, models]);

  const getModel = useCallback(
    async (givenID?: string): Promise<Model | undefined> => {
      if (!givenID) return undefined;
      if (loaded) {
        return models.find((model) => model.id === givenID);
      } else {
        return (await loadModels()).find((model) => model.id === givenID);
      }
    },
    [models, loaded, loadModels],
  );

  const currentModel = useMemo(() => {
    if (currentID) {
      const result = models.find((model) => model.id === currentID);
      if (result && result.id === id && capture) {
        return { ...result, capture };
      }
      return result;
    }
    return undefined;
  }, [id, capture, currentID, models]);

  const saveModel = useCallback(
    async (
      model: Partial<Omit<Model, "updatedAt">>,
      create: boolean = true,
    ): Promise<Model> => {
      const now = new Date();
      const withId = model.id ?? currentID ?? uuid();
      const storedModel: Partial<Model> | undefined = await getModel(model.id);

      if (!create && !storedModel) {
        throw new Error(`Model with the ID "${model.id}" is not found`);
      }

      const title =
        model.title ?? storedModel?.title ?? t("tabs.untitledModel");
      const gltf = model.gltf ?? storedModel?.gltf ?? undefined;
      const withCapture =
        withId === id && capture
          ? capture
          : model.capture ?? storedModel?.capture ?? undefined;
      const createdAt = model.createdAt ?? storedModel?.createdAt ?? now;
      const updatedAt = now;
      const modelToSave: Model = {
        id: withId,
        title,
        gltf,
        capture: withCapture,
        createdAt,
        updatedAt,
      };

      try {
        await setUserData("models", modelToSave.id, modelToSave);
        setModels((prev) =>
          prev.filter((m) => m.id !== modelToSave.id).concat(modelToSave),
        );
        return modelToSave;
      } catch (error) {
        throw new Error("Failed to save model", { cause: error });
      }
    },
    [id, capture, currentID, getModel, setModels, setUserData, t],
  );

  const deleteModel = useCallback(
    (givenID: string) => {
      setModels((prev) => prev.filter((m) => m.id !== givenID));
      removeUserData("models", givenID);
    },
    [setModels, removeUserData],
  );

  const updateModelID = useCallback(
    async (givenID: string, newID: string): Promise<Model> => {
      const model = await getModel(givenID);
      if (!model)
        throw new Error(`Model with the ID "${givenID}" is not found`);

      const result = await saveModel({ ...model, id: newID });
      if (currentID === givenID) {
        setCurrentID(newID);
      }
      deleteModel(givenID);
      return result;
    },
    [getModel, saveModel, currentID, setCurrentID, deleteModel],
  );

  const updateModel = useCallback(
    async (
      givenID: string,
      model: Partial<Omit<Model, "id" | "createdAt" | "updatedAt">>,
    ): Promise<Model> => {
      return saveModel({ ...model, id: givenID }, false);
    },
    [saveModel],
  );

  useEffect(() => {
    if (id && loadState === "none") {
      loadModels().catch((err: unknown) => {
        throw new Error("Failed to load models", { cause: err });
      });
    }
  }, [id, loadState, loadModels]);

  useEffect(() => {
    if (
      id &&
      capture &&
      currentID &&
      currentID === id &&
      loadState === "loaded" &&
      !captureSaveState
    ) {
      saveModel({ id, capture })
        .then(() => {
          setCaptureSaveState(true);
        })
        .catch((err: unknown) => {
          throw new Error("Failed to save model", { cause: err });
        });
    }
  }, [id, capture, currentID, loadState, captureSaveState, saveModel]);

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
    updateModelID,
  };
};
