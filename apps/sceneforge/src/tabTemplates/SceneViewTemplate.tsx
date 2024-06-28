import {
  Canvas,
  DrawerController,
  Orientation,
  Pane,
  Position,
  SplitPaneController,
  Variant,
  View,
} from "@sceneforge/ui";

export type SceneViewTemplateProps = {
  title?: string;
};

const SceneViewTemplate = ({ title }: SceneViewTemplateProps) => {
  return (
    <View>
      <Canvas />
      <DrawerController
        initialSize={48}
        orientation={Orientation.Horizontal}
        position={Position.End}
        resizable
        variant={Variant.Accent}
      >
        <Pane
          inner={false}
          title={title}
          toolbar={{
            actions: [
              {
                actions: [
                  {
                    kind: "button",
                    label: "Import...",
                    onClick: () => console.log("Import..."),
                  },
                ],
                kind: "dropdown",
                label: "Scene",
                variant: Variant.Accent,
              },
              {
                actions: [
                  {
                    kind: "toggle",
                    label: "View",
                    onClick: () => console.log("View Mode"),
                    variant: Variant.Accent,
                  },
                  {
                    kind: "toggle",
                    label: "Edit",
                    onClick: () => console.log("Edit Mode"),
                    variant: Variant.Accent,
                  },
                  {
                    kind: "toggle",
                    label: "Material",
                    onClick: () => console.log("Material Mode"),
                    variant: Variant.Accent,
                  },
                ],
                kind: "dropdown",
                label: "Mode",
                variant: Variant.Accent,
              },
            ],
          }}
        >
          <SplitPaneController orientation={Orientation.Horizontal} resizable>
            <Pane
              actions={[
                {
                  kind: "button",
                  label: "Action 1",
                  onClick: () => console.log("Action 1"),
                  variant: Variant.Accent,
                },
              ]}
              level={3}
              title="Left pane"
            >
              Left content
            </Pane>
            <Pane level={3} title="Right pane">
              Right content
            </Pane>
          </SplitPaneController>
        </Pane>
      </DrawerController>
    </View>
  );
};

export default SceneViewTemplate;
