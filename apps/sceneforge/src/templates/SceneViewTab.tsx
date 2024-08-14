import {
  Canvas,
  CollapsibleList,
  IconEnum,
  Orientation,
  Pane,
  SplitPaneController,
  type TabComponentProps,
  Tree,
  Variant,
  View,
} from "@sceneforge/ui";

import {
  HotspotPopover,
  SceneDrawer,
} from "../components";
import { useScene } from "../hooks";

export type SceneViewTabProps = TabComponentProps<{
  id?: string;
  title?: string;
}>;

const SceneViewTab = ({
  hidden,
  id,
  registerBeforeClose,
  title,
}: SceneViewTabProps) => {
  const {
    canvasRef,
    changeSceneTitle,
    editToggleRef,
    hotspotPopoverRef,
    materialToggleRef,
    openFileClickHandler,
    removeScene,
    sceneNodes,
    sidebarRef,
    sidebarResizable,
    toggleSceneEditMode,
    toggleSceneMaterialMode,
    toggleSceneViewMode,
    toggleSiderbar,
    viewToggleRef,
  } = useScene(id, hidden, registerBeforeClose);

  return (
    <SplitPaneController
      initialSize={[15, 85]}
      orientation={Orientation.Horizontal}
      ref={sidebarRef}
      resizable={sidebarResizable}
      variant={Variant.Primary}
    >
      <View>
        <Pane
          actions={[{
            icon: sidebarResizable
              ? IconEnum.LeftPanelClose
              : IconEnum.LeftPanelOpen,
            kind: "icon",
            label: sidebarResizable ? "Hide Sidebar" : "Show Sidebar",
            onClick: toggleSiderbar,
          }]}
          actionsPadding={sidebarResizable ? undefined : 0.25}
          level={3}
          outer
          title={sidebarResizable ? "Scene" : undefined}
        >
          {sidebarResizable && (
            <CollapsibleList
              items={[
                {
                  children: (
                    <View scrollable>
                      <Tree id={`scene-${id}-tree`} nodes={sceneNodes} />
                    </View>
                  ),
                  open: true,
                  title: "Scene Nodes",
                },
              ]}
              variant={Variant.Primary}
            />
          )}
        </Pane>
      </View>
      <View>
        <Canvas id={`scene-${id}-canvas`} ref={canvasRef} />
        <HotspotPopover
          id={`scene-${id}-canvas-hotspot`}
          ref={hotspotPopoverRef}
          variant={Variant.Primary}
        />
        <SceneDrawer
          changeSceneTitle={changeSceneTitle}
          editToggleRef={editToggleRef}
          id={`scene-${id}-drawer`}
          materialToggleRef={materialToggleRef}
          openFileClickHandler={openFileClickHandler}
          removeScene={removeScene}
          title={title}
          toggleSceneEditMode={toggleSceneEditMode}
          toggleSceneMaterialMode={toggleSceneMaterialMode}
          toggleSceneViewMode={toggleSceneViewMode}
          viewToggleRef={viewToggleRef}
        />
      </View>
    </SplitPaneController>
  );
};

export default SceneViewTab;
