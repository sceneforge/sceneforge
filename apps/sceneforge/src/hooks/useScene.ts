import type { SplitPaneComponentRef, ToggleComponentRef, ToggleEvent } from "@sceneforge/ui";

import { openSceneFile } from "@sceneforge/core";
import { database, useDatabase } from "@sceneforge/data";
import {
  EngineController,
  EngineState,
  id as getId,
  SceneHandler,
  sceneLoader,
  sceneNodeTree,
} from "@sceneforge/scene";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { type HotspotPopoverRef } from "../components";
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
  const db = useDatabase();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineController = useRef<EngineController>(null);
  const sceneHandler = useRef<SceneHandler>(null);
  const viewToggleRef = useRef<ToggleComponentRef>(null);
  const editToggleRef = useRef<ToggleComponentRef>(null);
  const materialToggleRef = useRef<ToggleComponentRef>(null);
  const hotspotPopoverRef = useRef<HotspotPopoverRef>(null);
  const sidebarRef = useRef<SplitPaneComponentRef>(null);

  const [isImporting, setIsImporting] = useState(false);
  const [sceneState, setSceneState] = useState(SceneState.View);
  const [sidebarResizable, setSidebarResizable] = useState(true);
  const [sidebarSize, setSidebarSize] = useState<string | undefined>();

  const sceneId = useMemo(() => {
    if (!id) return;
    const parsedId = Number.parseInt(id);

    if (Number.isNaN(parsedId)) return;
    if (parsedId < 0) return;
    return parsedId;
  }, [id]);

  const { removeTab } = useTabs();

  const currentScene = useMemo(() => {
    if (!sceneId) return;

    return database.scene.get(sceneId);
  }, [sceneId]);

  const removeScene = useCallback(async () => {
    if (!sceneId) return;

    await database.scene.delete(sceneId);
    removeTab(`scene-${sceneId}`);
  }, [sceneId, removeTab]);

  const changeSceneTitle = useCallback((name?: string) => {
    if (!sceneId) return;

    if (name) {
      void database.scene.update(sceneId, {
        name,
        updatedAt: new Date(),
      });
    }
  }, [sceneId]);

  const loadBlob = useCallback(async (blob?: Blob) => {
    if (
      blob
      && engineController.current
      && engineController.current.state === EngineState.Running
    ) {
      try {
        await sceneLoader(engineController.current.scene, blob);
      }
      catch (error: unknown) {
        console.error(error);
      }
      setIsImporting(false);
    }
  }, [engineController]);

  const openFileClickHandler = useCallback(() => {
    if (!sceneId) return;

    setIsImporting(true);

    openSceneFile("Import Scene")
      .then((blob) => {
        const now = new Date();
        if (!db) return;

        return db.sceneBlob.put({
          blob,
          createdAt: now,
          name: "Imported Scene",
          sceneId,
          updatedAt: now,
        }).then(() => loadBlob(blob));
      })
      .catch(error => console.error(error));
  }, [sceneId, loadBlob, db]);

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
    // eslint-disable-next-line react-compiler/react-compiler
    if (!isImporting && engineController.current) {
      // eslint-disable-next-line react-compiler/react-compiler
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
            hotspotPopoverRef.current.reset();
            const pointerEvent = event.sourceEvent;

            if (!pointerEvent) return;

            const { clientX: x, clientY: y } = pointerEvent;

            const mesh = event.target;
            if (event.extra && "hotspot" in event.extra) {
              hotspotPopoverRef.current.hotspotMesh = getId(
                event.extra.hotspot
              );
            }

            if (mesh && !Array.isArray(mesh)) {
              hotspotPopoverRef.current.mesh = mesh.id;
            }

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

  useEffect(() => {
    if (
      canvasRef.current instanceof HTMLCanvasElement
      && hidden === false
      && db
      && sceneId
    ) {
      const imported = db.sceneBlob.where("sceneId").equals(sceneId);

      imported.count().then((count) => {
        if (count > 0) {
          imported.each((sceneBlob) => {
            if ("blob" in sceneBlob && sceneBlob.blob instanceof Blob) {
              return loadBlob(sceneBlob.blob);
            }
          }).catch(error => console.error(error));
        }
      })
        .catch(error => console.error(error));
    }
  }, [canvasRef, db, hidden, sceneId, loadBlob]);

  return {
    canvasRef,
    changeSceneTitle,
    currentScene,
    editToggleRef,
    engineController,
    hotspotPopoverRef,
    materialToggleRef,
    openFileClickHandler,
    removeScene,
    sceneHandlerSelectStart,
    sceneHandlerSelectStop,
    sceneId,
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
