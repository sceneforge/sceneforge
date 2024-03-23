import { type Scene } from "@babylonjs/core/scene";
import { PanelSheetSection } from "../PanelSheet";
import { SceneNodeTree } from "../SceneNodeTree";
import { type Dispatch } from "react";
import { type Nullable } from "@babylonjs/core/types";

export type SceneNodesSectionProps = {
  scene: Nullable<Scene>;
  onNodeSelect: Dispatch<unknown>;
};

export const SceneNodesSection = ({
  scene,
  onNodeSelect,
}: SceneNodesSectionProps) => {
  return (
    <PanelSheetSection title="Scene Nodes">
      <SceneNodeTree scene={scene} onNodeSelect={onNodeSelect} />
    </PanelSheetSection>
  );
};
