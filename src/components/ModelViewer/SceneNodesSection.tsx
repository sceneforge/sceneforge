import { type Scene } from "@babylonjs/core/scene";
import { PanelSheetSection } from "../PanelSheet";
import { SceneNodeTree } from "../SceneNodeTree";
import { type Dispatch } from "react";
import { type Nullable } from "@babylonjs/core/types";
import { useTranslation } from "react-i18next";

export type SceneNodesSectionProps = {
  scene: Nullable<Scene>;
  meshSelectionPath?: readonly string[];
  clearMeshSelectionPath?: () => void;
  onNodeSelect: Dispatch<unknown>;
};

export const SceneNodesSection = ({
  scene,
  meshSelectionPath,
  clearMeshSelectionPath,
  onNodeSelect,
}: SceneNodesSectionProps) => {
  const { t } = useTranslation("ModelViewer");

  return (
    <PanelSheetSection title={t("SceneNodesSection.title")}>
      <SceneNodeTree
        scene={scene}
        onNodeSelect={onNodeSelect}
        meshSelectionPath={meshSelectionPath}
        clearMeshSelectionPath={clearMeshSelectionPath}
      />
    </PanelSheetSection>
  );
};
