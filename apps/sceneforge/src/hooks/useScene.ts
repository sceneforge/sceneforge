import type { PopoverRef, SplitPaneComponentRef, ToggleComponentRef, ToggleEvent } from "@sceneforge/ui";

import { openSceneFile } from "@sceneforge/core";
import { database } from "@sceneforge/data";
import {
  EngineController,
  EngineState,
  SceneHandler,
  sceneLoader,
  sceneNodeTree,
} from "@sceneforge/scene";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useTabs } from "./useTabs";

export enum SceneState {
  Edit = "edit",
  View = "view",
};

export const useScene = (
  id?: string,
  hidden?: boolean,
  registerBeforeClose?: (callback?: () => Promise<void> | void) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineController = useRef<EngineController>(null);
  const sceneHandler = useRef<SceneHandler>(null);
  const viewToggleRef = useRef<ToggleComponentRef>(null);
  const editToggleRef = useRef<ToggleComponentRef>(null);
  const materialToggleRef = useRef<ToggleComponentRef>(null);
  const hotspotPopoverRef = useRef<PopoverRef>(null);
  const sidebarRef = useRef<SplitPaneComponentRef>(null);

  const [isImporting, setIsImporting] = useState(false);
  const [sceneState, setSceneState] = useState(SceneState.View);
  const [sidebarResizable, setSidebarResizable] = useState(true);
  const [sidebarSize, setSidebarSize] = useState<string | undefined>();

  const { removeTab } = useTabs();

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
        sceneLoader(engineController.current.scene, blob).then((result) => {
          setIsImporting(false);
          return result;
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
        const handler = new SceneHandler(controller.scene);

        controller.start();
        engineController.current = controller;
        sceneHandler.current = handler;

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

  const sceneHandlerSelectStart = useCallback(() => {
    if (sceneHandler.current) {
      const selectHandler = sceneHandler.current.fromSceneRootMesh().select;
      if (selectHandler) {
        selectHandler.addEventListeners("selectDismiss", () => {
          if (hotspotPopoverRef.current) {
            hotspotPopoverRef.current.hide();
          }
        });

        selectHandler.addEventListeners("hotspotSelect", (event) => {
          if (hotspotPopoverRef.current) {
            const pointerEvent = event.sourceEvent;

            if (!pointerEvent) return;

            const { clientX: x, clientY: y } = pointerEvent;

            hotspotPopoverRef.current.position(x, y);
            hotspotPopoverRef.current.show();
          }
        });
        selectHandler.start();
        setSceneState(SceneState.Edit);
      }
    }
  }, [sceneHandler, hotspotPopoverRef]);

  const sceneHandlerSelectStop = useCallback(() => {
    if (sceneHandler.current) {
      sceneHandler.current.select?.dispose();
      setSceneState(SceneState.View);
    }
  }, [sceneHandler]);

  const toggleSceneViewMode = useCallback((
    { nativeEvent, state }: ToggleEvent
  ) => {
    if (state === "pressed") {
      if (editToggleRef.current?.pressed) {
        editToggleRef.current.toggle();
      }

      if (materialToggleRef.current?.pressed) {
        materialToggleRef.current.toggle();
      }
    }
    else if (
      nativeEvent !== undefined
      && editToggleRef.current
      && !editToggleRef.current.pressed
    ) {
      editToggleRef.current.toggle(undefined, true);
      sceneHandlerSelectStart();
    }
  }, [
    editToggleRef,
    materialToggleRef,
    sceneHandlerSelectStart,
  ]);

  const toggleSceneEditMode = useCallback((
    { nativeEvent, state }: ToggleEvent
  ) => {
    if (state === "pressed") {
      if (viewToggleRef.current?.pressed) {
        viewToggleRef.current.toggle();
      }
      if (materialToggleRef.current?.pressed) {
        materialToggleRef.current.toggle();
      }
      sceneHandlerSelectStart();
    }
    else {
      sceneHandlerSelectStop();
      if (
        nativeEvent !== undefined
        && viewToggleRef.current
        && !viewToggleRef.current.pressed
      ) {
        viewToggleRef.current.toggle(
          undefined,
          true
        );
      }
    }
  }, [
    viewToggleRef,
    materialToggleRef,
    sceneHandlerSelectStart,
    sceneHandlerSelectStop,
  ]);

  const toggleSceneMaterialMode = useCallback(({ state }: ToggleEvent) => {
    if (state === "pressed") {
      if (viewToggleRef.current?.pressed) {
        viewToggleRef.current.toggle();
      }
      if (editToggleRef.current?.pressed) {
        editToggleRef.current.toggle();
      }
    }
  }, [
    viewToggleRef,
    editToggleRef,
  ]);

  const toggleSiderbar = useCallback(() => {
    const splitPane = sidebarRef.current;

    setSidebarResizable((previous) => {
      if (splitPane && previous) {
        setSidebarSize(
          splitPane.childSize(0)
        );
        splitPane.resizeChild(0, "2rem");
      }
      else if (splitPane && !previous && sidebarSize) {
        splitPane.resizeChild(0, sidebarSize);
      }
      return !previous;
    });
  }, [sidebarRef, sidebarSize]);

  return {
    canvasRef,
    changeSceneTitle,
    currentScene,
    editToggleRef,
    hotspotPopoverRef,
    materialToggleRef,
    openFileClickHandler,
    removeScene,
    sceneHandlerSelectStart,
    sceneHandlerSelectStop,
    sceneNodes,
    sceneState,
    sidebarRef,
    sidebarResizable,
    toggleSceneEditMode,
    toggleSceneMaterialMode,
    toggleSceneViewMode,
    toggleSiderbar,
    viewToggleRef,
  };
};
