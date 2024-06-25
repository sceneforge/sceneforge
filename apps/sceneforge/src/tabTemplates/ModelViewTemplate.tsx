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

export type ModelViewTemplateProps = {
  title: string;
};

const ModelViewTemplate = ({ title }: ModelViewTemplateProps) => {
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
        <Pane inner={false} title={title}>
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

export default ModelViewTemplate;
