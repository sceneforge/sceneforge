import { useTranslation } from "react-i18next";
import { ModelViewer } from "../../components/ModelViewer";
import { Tab, TabProps } from "../../components/TabPanel";
import { Model } from "../../lib/isModel";

export type ModelViewTabProps = TabProps<{
  active?: boolean;
}> &
  Omit<Model & { title?: string }, "capture">;

export const ModelViewTab = Tab(
  ({ active, id, title, gltf }: ModelViewTabProps) => {
    const { t } = useTranslation("tabs");
    return (
      <ModelViewer
        active={active}
        gltf={gltf}
        id={id}
        title={title ?? t("ModelViewTab.untitledModel")}
      />
    );
  },
);
