// import { useTranslation } from "react-i18next";

// import { ModelViewer } from "../../components/ModelViewer";
import {
  Canvas,
  DrawerController,
  Orientation,
  Pane,
  Position,
  SplitPaneController,
  TabComponentType,
  Variant,
  View,
} from "@sceneforge/ui";

const ModelViewTab: TabComponentType = () => {
  // const { t } = useTranslation("tabs");
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
        <Pane inner={false} title="Model Title">
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
  // return (
  // <ModelViewer
  //   active={!hidden}
  //   id={tabId}
  //   title={t("ModelViewTab.untitledModel")}
  // />
  // );
};

export default ModelViewTab;
