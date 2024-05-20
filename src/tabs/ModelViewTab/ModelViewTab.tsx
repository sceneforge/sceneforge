import { useTranslation } from "react-i18next";
import { ModelViewer } from "../../components/ModelViewer";
import { type TabProps } from "../../components/TabPanel";
import { Model } from "../../lib/isModel";

export type ModelViewTabProps = TabProps<{
  active?: boolean;
}> &
  Omit<Model & { title?: string }, "capture">;

export const ModelViewTab = ({
  active,
  id,
  title,
  gltf,
}: ModelViewTabProps) => {
  const { t } = useTranslation("tabs");
  return (
    <ModelViewer
      active={active}
      gltf={gltf}
      id={id}
      title={title ?? t("ModelViewTab.untitledModel")}
    />
  );
};
