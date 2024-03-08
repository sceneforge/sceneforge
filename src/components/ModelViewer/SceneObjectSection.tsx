import { MouseEventHandler, useMemo } from "react";
import { id, name, typeOf } from "../../lib/sceneObject";
import { PanelSheetSection } from "../PanelSheet";

export interface SceneObjectSectionProps {
  node: unknown;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export const SceneObjectSection = ({ node, onClose }: SceneObjectSectionProps) => {
  const nodeType = useMemo(() => typeOf(node), [node]);
  const nodeName = useMemo(() => name(node), [node]);
  const nodeId = useMemo(() => id(node), [node]);

  if (!node) return null;

  return (
    <PanelSheetSection title={nodeName} actions={[
      { icon: "close", label: "Close", onClick: onClose }
    ]}>
      <dl>
        <dt>Instance</dt>
        <dd>{nodeType}</dd>
        <dt>id</dt>
        <dd>{nodeId}</dd>
      </dl>
    </PanelSheetSection>
  );
};
