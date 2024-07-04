import { openSceneFile } from "@sceneforge/core";
import { database } from "@sceneforge/data";
import { EngineController, EngineState, sceneLoader, sceneNodeTree } from "@sceneforge/scene";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useAppTabs } from "../components/App";

export const useScene = (
  id?: string,
  hidden?: boolean,
  registerBeforeClose?: (callback?: () => Promise<void> | void) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineController = useRef<EngineController>(null);
  const [isImporting, setIsImporting] = useState(false);

  const { removeTab } = useAppTabs();

  const currentScene = useMemo(() => {
    if (!id) return;
    if (Number.isNaN(Number.parseInt(id))) return;

    return database.scene.get(Number.parseInt(id));
  }, [id]);

  const removeScene = useCallback(async () => {
    if (!id) return;
    if (Number.isNaN(Number.parseInt(id))) return;

    await database.scene.delete(Number.parseInt(id));
    removeTab(`scene-${id}`);
  }, [id, removeTab]);

  const changeSceneTitle = useCallback((name?: string) => {
    if (!id) return;
    if (Number.isNaN(Number.parseInt(id))) return;

    if (name) {
      void database.scene.update(Number.parseInt(id), {
        name,
        updatedAt: new Date(),
      });
    }
  }, [id]);

  const openFileClickHandler = useCallback(() => {
    if (!id) return;
    if (Number.isNaN(Number.parseInt(id))) return;
    setIsImporting(true);

    openSceneFile("Import Scene").then((blob) => {
      if (
        blob
        && engineController.current
        && engineController.current.state === EngineState.Running
      ) {
        sceneLoader(engineController.current.scene, blob).then(() => {
          setIsImporting(false);
        })
          .catch((error) => {
            console.error(error);
          });
      }
    })
      .catch(error => console.error(error));
  }, [engineController, id]);

  useEffect(() => {
    if (canvasRef.current && canvasRef.current instanceof HTMLCanvasElement) {
      if (hidden === false && !engineController.current) {
        const controller = new EngineController(canvasRef.current, true);
        controller.start();
        engineController.current = controller;
        if (registerBeforeClose) {
          registerBeforeClose(() => {
            if (engineController.current) {
              engineController.current.stop();
            }
          });
        }
      }
      else if (hidden === false && engineController.current) {
        engineController.current.start();
      }
      else if (hidden === true && engineController.current) {
        engineController.current.pause();
      }
    }
    else if (!canvasRef.current && engineController.current) {
      engineController.current.stop();
    }
  }, [canvasRef, engineController, hidden, registerBeforeClose]);

  const sceneNodes = useMemo(() => {
    if (!isImporting && engineController.current) {
      return sceneNodeTree(engineController.current.scene);
    }
    else if (isImporting) {
      return [
        {
          id: "loading",
          label: "Loading...",
        },
      ];
    }
    return [];
  }, [engineController, isImporting]);

  return {
    canvasRef,
    changeSceneTitle,
    currentScene,
    openFileClickHandler,
    removeScene,
    sceneNodes,
  };
};
