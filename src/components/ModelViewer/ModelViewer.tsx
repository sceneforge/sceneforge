import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { Canvas } from "../Canvas";
import { IconButton } from "../IconButton";
import { PanelSheet, PanelSheetBody, PanelSheetHeader, PanelSheetHeaderGroup, PanelSheetSection } from "../PanelSheet";
import { useTabPanel } from "../TabPanel";
import { useModelObject } from "./useModelObject";
import { useModelViewer } from "./useModelViewer";

import { TreeView } from "../TreeView";

export interface ModelProps {
  id?: string;
  title?: string;
  gltf?: Blob;
  capture?: string;
}

export interface ModelViewerProps extends Omit<ModelProps, "capture"> {
  active?: boolean;
}

export const ModelViewer = ({ active, ...props }: ModelViewerProps) => {
  const [loaded, setLoaded] = useState(false);
  const { updateTabTitle } = useTabPanel();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    capture,
    startAll,
    disposeAll,
    openGLTFBlob,
    renderSceneLoop,
    stopRenderSceneLoop
  } = useModelViewer(canvasRef);

  const {
    loadState,
    currentID,
    currentTitle,
    currentGLTF,
    loadRecentModel,
    saveRecentModel,
    updateTitle
  } = useModelObject({ ...props, capture });

  const loadModel = useCallback(() => {
    loadRecentModel().then(() => {
      setLoaded(true);
    }).catch(console.error);
  }, [setLoaded, loadRecentModel]);

  const handleInput = useCallback((event: SyntheticEvent<HTMLInputElement, InputEvent>) => {
    if (event.target instanceof HTMLInputElement) {
      updateTitle(event.target.value);
      if (currentID) {
        updateTabTitle(currentID, event.target.value);
      }
    }
  }, [currentID, updateTabTitle, updateTitle]);

  useEffect(() => {
    if (currentID) {
      startAll();
    }
    return () => {
      disposeAll();
    };
  }, [currentID, startAll, disposeAll]);

  useEffect(() => {
    if (loadState === "none") {
      loadModel();
    }
    if (loadState === "loaded") {
      saveRecentModel();
    }
  }, [
    loadState,
    loadModel,
    saveRecentModel,
  ]);

  useEffect(() => {
    if (loaded && currentGLTF) {
      openGLTFBlob(currentGLTF);
    }
  }, [loaded, currentGLTF, openGLTFBlob]);

  useEffect(() => {
    if (loadState === "loaded" && active) {
      renderSceneLoop();
    }
    return () => {
      if (active) {
        stopRenderSceneLoop();
      }
    };
  }, [active, loadState, renderSceneLoop, stopRenderSceneLoop]);

  return (
    <>
      <Canvas ref={canvasRef} />
      <PanelSheet orientation="block" position="end" resizable size="md">
        <PanelSheetHeader
          editable
          name="model-name"
          title={currentTitle ?? "Untitled Model"}
          onInput={handleInput}
        >
          <PanelSheetHeaderGroup title="Select" description="Mesh selection methods">
            <IconButton icon="arrow-pointer" title="Single Mesh" />
            <IconButton icon="circle-chevron-up" title="Parent Meshes" />
          </PanelSheetHeaderGroup>
        </PanelSheetHeader>
        <PanelSheetBody>
          <PanelSheetSection title="Meshes">
            <TreeView data={[
              {
                id: "1",
                label: "Mesh 1",
                children: [
                  {
                    id: "2",
                    label: "Submesh 1",
                    children: [
                      { id: "3", label: "Submesh 1" },
                      { id: "4", label: "Submesh 2" },
                    ]
                  },
                  {
                    id: "5",
                    label: "Submesh 2"
                  },
                ],
              },
              {
                id: "6",
                label: "Mesh 2",
                children: [
                  { id: "7", label: "Submesh 1" },
                  { id: "8", label: "Submesh 2" },
                ],
              },
              {
                id: "9",
                label: "Mesh 3",
                children: [
                  { id: "10", label: "Submesh 1" },
                  {
                    id: "11",
                    label: "Submesh 2",
                    children: [
                      {
                        id: "12",
                        label: "Submesh 1"
                      },
                      {
                        id: "13",
                        label: "Submesh 2",
                        children: [
                          {
                            id: "14",
                            label: "Submesh 1"
                          },
                          {
                            id: "15",
                            label: "Submesh 2"
                          },
                          {
                            id: "16",
                            label: "Submesh 3"
                          },
                          {
                            id: "17",
                            label: "Submesh 4"
                          }
                        ]
                      },
                    ]
                  },
                ],
              }
            ]} />
          </PanelSheetSection>
          <PanelSheetSection title="This is an example of a title">
            <p>This is an example of a section.</p>
          </PanelSheetSection>
        </PanelSheetBody>
      </PanelSheet>
    </>
  );
};

