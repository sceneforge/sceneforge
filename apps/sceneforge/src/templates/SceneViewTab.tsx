import {
  Canvas,
  DrawerController,
  Orientation,
  Pane,
  Popover,
  Position,
  SplitPaneController,
  type TabComponentProps,
  TabsController,
  Tree,
  Variant,
  View,
} from "@sceneforge/ui";

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
    toggleSceneEditMode,
    toggleSceneMaterialMode,
    toggleSceneViewMode,
    viewToggleRef,
  } = useScene(id, hidden, registerBeforeClose);

  return (
    <SplitPaneController
      initialSize={[15, 85]}
      orientation={Orientation.Horizontal}
      resizable
      variant={Variant.Primary}
    >
      <Pane outer title="Scene">
        <Tree id={`scene-${id}-tree`} nodes={sceneNodes} />
      </Pane>
      <TabsController
        initialContent={[
          {
            panel: {
              component: () => (
                <View>
                  <Canvas id={`scene-${id}-canvas`} ref={canvasRef} />
                  <Popover ref={hotspotPopoverRef}>
                    Hotspot
                  </Popover>
                  <DrawerController
                    initialSize={48}
                    orientation={Orientation.Horizontal}
                    position={Position.End}
                    resizable
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
                      ]}
                      onTitleChange={changeSceneTitle}
                      outer
                      title={title}
                      titleEditable
                    >
                      <SplitPaneController
                        orientation={Orientation.Horizontal}
                        resizable
                      >
                        <View padding={0.25}>
                          <Pane
                            level={3}
                            paneActions={[
                              {
                                kind: "button",
                                label: "Action 1",
                                onClick: () => console.log("Action 1"),
                                variant: Variant.Accent,
                              },
                            ]}
                            title="Left pane"
                          >
                            Left content
                          </Pane>
                        </View>
                        <View padding={0.25}>
                          <Pane level={3} title="Right pane">
                            Right content
                          </Pane>
                        </View>
                      </SplitPaneController>
                    </Pane>
                  </DrawerController>
                </View>
              ),
              props: {},
            },
            tab: {
              id: `scene-${id}-canvas`,
              label: "Canvas",
            },
          },
          {
            panel: {
              component: () => (<div>Settings</div>),
              props: {},
            },
            tab: {
              id: `scene-${id}-settings`,
              label: "Settings",
            },
          },
        ]}
        orientation={Orientation.Horizontal}
        position={Position.End}
        variant={Variant.Primary}
      />
    </SplitPaneController>
  );
};

export default SceneViewTab;
