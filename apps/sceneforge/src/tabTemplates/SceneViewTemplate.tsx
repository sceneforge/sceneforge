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
                    label: "Import...",
                    onClick: () => console.log("Import..."),
                    type: "button",
                  },
                ],
                label: "Scene",
                type: "dropdown",
                variant: Variant.Accent,
              },
              {
                actions: [
                  {
                    label: "View",
                    onClick: () => console.log("View Mode"),
                    type: "toggle",
                    variant: Variant.Accent,
                  },
                  {
                    label: "Edit",
                    onClick: () => console.log("Edit Mode"),
                    type: "toggle",
                    variant: Variant.Accent,
                  },
                  {
                    label: "Material",
                    onClick: () => console.log("Material Mode"),
                    type: "toggle",
                    variant: Variant.Accent,
                  },
                ],
                label: "Mode",
                type: "dropdown",
                variant: Variant.Accent,
              },
            ],
          }}
        >
          <SplitPaneController orientation={Orientation.Horizontal} resizable>
            <Pane
              actions={[
                {
                  label: "Action 1",
                  onClick: () => console.log("Action 1"),
                  type: "button",
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
