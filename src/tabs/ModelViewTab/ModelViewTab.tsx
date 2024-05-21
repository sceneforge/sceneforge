import { useTranslation } from "react-i18next";

import { ModelViewer } from "../../components/ModelViewer";
import { type TabProps } from "../../components/TabPanel";
import { Model } from "../../lib/isModel";

export type ModelViewTabProps = Omit<{ title?: string } & Model, "capture"> &
  TabProps<{
    active?: boolean;
  }>;

export const ModelViewTab = ({
  active,
  gltf,
  id,
  title,
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
