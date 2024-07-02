import { useCallback, useContext, useEffect, useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { v4 as uuid } from "uuid";

import { Model } from "../../lib/isModel";
// import { usePanel } from "../Panel";
import { ModelContext } from "./ModelContextProvider";

export const useModelContext = ({ capture, id }: Partial<Model> = {}) => {
  // const { t } = useTranslation("common");
  // const { loadState, loaded, models, setLoadState, setLoaded, setModels }
  const { loadState, loaded, models, setLoadState, setModels }
    = useContext(ModelContext);
  // const { getAllUserData, removeUserData, setUserData } = usePanel();

  const [currentID, setCurrentID] = useState<string | undefined>(id);
  const [captureSaveState, setCaptureSaveState] = useState<boolean | undefined>(
    false
  );

  const loadModels = useCallback((): Promise<Model[]> => {
    setLoadState("loading");
    return new Promise(() => {
      // getAllUserData(
      //   "models",
      //   (data) => {
      //     setModels([]);
      //     if (Array.isArray(data)) {
      //       for (const model of data) {
      //         if (isModel(model)) {
      //           setModels(previous => [...previous, model]);
      //         }
      //       }
      //     }
      //     setLoaded(true);
      //     setLoadState("loaded");
      //     resolve(models);
      //   },
      //   (error) => {
      //     setLoadState("error");
      //     if (error instanceof Error) {
      //       reject(error);
      //     }
      //     else {
      //       reject(new Error("Failed to load models", { cause: error }));
      //     }
      //   }
      // );
    });
    // }, [setLoadState, getAllUserData, setModels, setLoaded, models]);
  }, [setLoadState]);

  const getModel = useCallback(
    async (givenID?: string): Promise<Model | undefined> => {
      if (!givenID) return undefined;
      if (loaded) {
        return models.find(model => model.id === givenID);
      }
      else {
        try {
          const modelsResult = await loadModels();
          return modelsResult.find(model => model.id === givenID);
        }
        catch (error) {
          throw new Error("Failed to get model", { cause: error });
        }
      }
    },
    [models, loaded, loadModels]
  );

  const currentModel = useMemo(() => {
    if (currentID) {
      const result = models.find(model => model.id === currentID);
      if (result && result.id === id && capture) {
        return { ...result, capture };
      }
      return result;
    }
    return;
  }, [id, capture, currentID, models]);

  const saveModel = useCallback(
    async (
      model: Partial<Omit<Model, "updatedAt">>,
      create: boolean = true
    ): Promise<Model> => {
      // const now = new Date();
      // const withId = model.id ?? currentID ?? uuid();
      const storedModel: Partial<Model> | undefined = await getModel(model.id);

      if (!create && !storedModel) {
        throw new Error(`Model with the ID "${model.id}" is not found`);
      }

      // const title
      //   = model.title ?? storedModel?.title ?? t("tabs.untitledModel");
      // const gltf = model.gltf ?? storedModel?.gltf ?? undefined;
      // const withCapture
      //   = withId === id && capture
      //     ? capture
      //     : model.capture ?? storedModel?.capture ?? undefined;
      // const createdAt = model.createdAt ?? storedModel?.createdAt ?? now;
      // const updatedAt = now;
      // const modelToSave: Model = {
      //   capture: withCapture,
      //   createdAt,
      //   gltf,
      //   id: withId,
      //   title,
      //   updatedAt,
      // };

      // try {
      //   await setUserData("models", modelToSave.id, modelToSave);
      //   setModels(previous => [
      //     ...previous.filter(m => m.id !== modelToSave.id),
      //     modelToSave,
      //   ]);
      //   return modelToSave;
      // }
      // catch (error) {
      //   throw new Error("Failed to save model", { cause: error });
      // }
      return model as Model;
    },
    // [id, capture, currentID, getModel, setModels, setUserData, t]
    [getModel]
  );

  const deleteModel = useCallback(
    (givenID: string) => {
      setModels(previous => previous.filter(m => m.id !== givenID));
      // removeUserData("models", givenID);
    },
    // [setModels, removeUserData]
    [setModels]
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
    [getModel, saveModel, currentID, setCurrentID, deleteModel]
  );

  const updateModel = useCallback(
    async (
      givenID: string,
      model: Partial<Omit<Model, "createdAt" | "id" | "updatedAt">>
    ): Promise<Model> => {
      return saveModel({ ...model, id: givenID }, false);
    },
    [saveModel]
  );

  useEffect(() => {
    if (id && loadState === "none") {
      loadModels().catch((error: unknown) => {
        throw new Error("Failed to load models", { cause: error });
      });
    }
  }, [id, loadState, loadModels]);

  useEffect(() => {
    if (
      id
      && capture
      && currentID
      && currentID === id
      && loadState === "loaded"
      && !captureSaveState
    ) {
      saveModel({ capture, id })
        .then(() => {
          setCaptureSaveState(true);
        })
        .catch((error: unknown) => {
          throw new Error("Failed to save model", { cause: error });
        });
    }
  }, [id, capture, currentID, loadState, captureSaveState, saveModel]);

  return {
    currentID,
    currentModel,
    deleteModel,
    getModel,
    loadModels,
    loadState,
    models,
    saveModel,
    setCurrentID,
    updateModel,
    updateModelID,
  };
};
