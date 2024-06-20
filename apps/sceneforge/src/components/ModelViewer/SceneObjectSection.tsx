import { IconEnum } from "@sceneforge/ui";
import { MouseEventHandler, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { id, name, typeOf } from "../../lib/sceneObject";
import { PanelSheetSection } from "../PanelSheet";

export interface SceneObjectSectionProps {
  node: unknown;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export const SceneObjectSection = ({
  node,
  onClose,
}: SceneObjectSectionProps) => {
  const { t } = useTranslation("ModelViewer");
  const nodeType = useMemo(() => typeOf(node), [node]);
  const nodeName = useMemo(() => name(node), [node]);
  const nodeId = useMemo(() => id(node), [node]);

  if (!node) return null;

  return (
    <PanelSheetSection
      actions={[
        {
          icon: IconEnum.Close,
          label: t("SceneObjectSection.actions.closeButton"),
          onClick: onClose,
          type: "icon",
        },
      ]}
      title={nodeName}
    >
      <dl>
        <dt>Instance</dt>
        <dd>{nodeType}</dd>
        <dt>id</dt>
        <dd>{nodeId}</dd>
      </dl>
    </PanelSheetSection>
  );
};
