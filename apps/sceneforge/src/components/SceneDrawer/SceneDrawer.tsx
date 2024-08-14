import {
  DrawerController,
  IconEnum,
  Orientation,
  Pane,
  PaneProps,
  Position,
  type ResizableHandler,
  SplitPaneController,
  type ToggleComponentRef,
  ToggleProps,
  useCurrentId,
  Variant,
} from "@sceneforge/ui";
import {
  type Ref,
  useCallback,
  useRef,
  useState,
} from "react";

import { HotspotsPane } from "../HotspotsPane";

export type SceneDrawerProps = {
  changeSceneTitle: PaneProps["onTitleChange"];
  editToggleRef: Ref<ToggleComponentRef>;
  id?: string;
  materialToggleRef: Ref<ToggleComponentRef>;
  openFileClickHandler: () => void;
  removeScene: () => (Promise<void> | void);
  title: PaneProps["title"];
  toggleSceneEditMode: ToggleProps["onToggle"];
  toggleSceneMaterialMode: ToggleProps["onToggle"];
  toggleSceneViewMode: ToggleProps["onToggle"];
  viewToggleRef: Ref<ToggleComponentRef>;
};

const SceneDrawer = ({
  changeSceneTitle,
  editToggleRef,
  id,
  materialToggleRef,
  openFileClickHandler,
  removeScene,
  title,
  toggleSceneEditMode,
  toggleSceneMaterialMode,
  toggleSceneViewMode,
  viewToggleRef,
}: SceneDrawerProps) => {
  const currentId = useCurrentId(id);

  const paneRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<ResizableHandler>(null);

  const [drawerResizable, setDrawerResizable] = useState<boolean>(true);

  const [drawerSize, setDrawerSize] = useState<number>(48);

  const getHeaderHeight = useCallback(() => {
    if (
      paneRef.current
      && paneRef.current.childNodes.length > 0
    ) {
      const paneFirstChild = paneRef.current.childNodes.item(0);
      if (paneFirstChild instanceof HTMLElement) {
        const {
          height,
        } = paneFirstChild.getBoundingClientRect();
        return height;
      }
    }
    return;
  }, [paneRef]);

  const minimizeDrawer = useCallback(() => {
    const currentSize = drawerRef.current?.size;
    const height = getHeaderHeight();
    setDrawerSize((previousSize) => {
      if (drawerRef.current && currentSize && height) {
        drawerRef.current.size = `calc(${height}px + 0.5rem)`;
        if (typeof currentSize === "number") {
          return currentSize;
        }
      }
      return previousSize;
    });
  }, [getHeaderHeight, drawerRef]);

  const restoreDrawer = useCallback(() => {
    if (drawerRef.current && drawerSize) {
      drawerRef.current.size = drawerSize;
    }
  }, [drawerRef, drawerSize]);

  const toggleDrawerResizable = useCallback(() => {
    if (drawerResizable) {
      minimizeDrawer();
      setDrawerResizable(false);
    }
    else {
      setDrawerResizable(true);
      restoreDrawer();
    }
  }, [drawerResizable, minimizeDrawer, restoreDrawer]);

  return (
    <DrawerController
      initialSize={48}
      orientation={Orientation.Horizontal}
      position={Position.End}
      ref={drawerRef}
      resizable={drawerResizable}
      variant={Variant.Accent}
    >
      <Pane
        actions={[
          {
            actions: [
              {
                kind: "button",
                label: "Import...",
                onClick: openFileClickHandler,
              },
              {
                kind: "divider",
                spacing: 1,
              },
              {
                glossy: true,
                inverted: true,
                kind: "button",
                label: "Delete",
                onClick: () => void removeScene(),
                variant: Variant.Danger,
              },
            ],
            glossy: true,
            kind: "dropdown",
            label: "Scene",
            variant: Variant.Accent,
          },
          {
            actions: [
              {
                glossy: [false, true],
                inverted: [false, true],
                kind: "toggle",
                label: "View",
                onToggle: toggleSceneViewMode,
                pressed: true,
                ref: viewToggleRef,
                variant: Variant.Accent,
              },
              {
                glossy: [false, true],
                inverted: [false, true],
                kind: "toggle",
                label: "Edit",
                onToggle: toggleSceneEditMode,
                ref: editToggleRef,
                variant: Variant.Accent,
              },
              {
                glossy: [false, true],
                inverted: [false, true],
                kind: "toggle",
                label: "Material",
                onToggle: toggleSceneMaterialMode,
                ref: materialToggleRef,
                variant: Variant.Accent,
              },
            ],
            glossy: true,
            kind: "dropdown",
            label: "Mode",
            variant: Variant.Accent,
          },
          {
            icon: drawerResizable
              ? IconEnum.BottomPanelClose
              : IconEnum.BottomPanelOpen,
            kind: "icon",
            label: drawerResizable ? "Hide Drawer" : "Show Drawer",
            onClick: toggleDrawerResizable,
            variant: Variant.Accent,
          },
        ]}
        onTitleChange={changeSceneTitle}
        outer
        ref={paneRef}
        title={title}
        titleEditable
      >
        <SplitPaneController
          orientation={Orientation.Horizontal}
          resizable
        >
          <HotspotsPane id={`${currentId}-scene-hotspots`} />
        </SplitPaneController>
      </Pane>
    </DrawerController>
  );
};

export default SceneDrawer;
