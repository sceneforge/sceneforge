import { type Scene } from "@babylonjs/core/scene";
import { PanelSheetSection } from "../PanelSheet";
import { SceneNodeTree } from "../SceneNodeTree";
import { type Dispatch } from "react";
import { type Nullable } from "@babylonjs/core/types";
import { useTranslation } from "react-i18next";

export type SceneNodesSectionProps = {
  scene: Nullable<Scene>;
  onNodeSelect: Dispatch<unknown>;
};

export const SceneNodesSection = ({
  scene,
  onNodeSelect,
}: SceneNodesSectionProps) => {
  const { t } = useTranslation("ModelViewer");

  return (
    <PanelSheetSection title={t("SceneNodesSection.title")}>
      <SceneNodeTree scene={scene} onNodeSelect={onNodeSelect} />
    </PanelSheetSection>
  );
};
