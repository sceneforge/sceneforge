
import { useCallback, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Carousel } from "../../components/Carousel";
import { type ModelProps } from "../../components/ModelViewer/ModelViewer";
import { Tab } from "../../components/TabPanel";
import { useTabs } from "../../hooks/useTabs";
import { SafeArea } from "../../components/SafeArea";
import { useModelContext } from "../../components/ModelContext";
import { HeroIconButton } from "../../components/HeroIconButton";
import { useTranslation } from "react-i18next";

export interface HomeTabProps {
  active?: boolean;
  title?: string;
}

export const HomeTab = Tab(({ active }: HomeTabProps) => {
  const { t } = useTranslation("tabs");
  const [loaded, setLoaded] = useState(false);
  const { models, loadModels } = useModelContext();
  const { newModelViewTab, closeModelViewTab } = useTabs();

  const openModel = useCallback(
    (model: ModelProps) => {
      return () => {
        newModelViewTab(model);
      };
    },
    [newModelViewTab]
  );

  const deleteModel = useCallback(
    (model: ModelProps) => {
      return () => {
        console.log("delete", model);
        closeModelViewTab(model.id);
      };
    },
    [closeModelViewTab]
  );

  useEffect(() => {
    if (!active) {
      setLoaded(false);
    }
  }, [active, setLoaded]);

  useEffect(() => {
    if (!loaded && active) {
      loadModels();
      setLoaded(true);
    }
  }, [loaded, active, loadModels, setLoaded]);

  return (
    <SafeArea vertical>
      <Carousel title={t("HomeTab.sections.models.title")}>
        {models.map((model, index) => (
          <Card
            variant="accent"
            actions={[
              {
                label: t("HomeTab.sections.models.actions.open"),
                variant: "accent",
                onClick: openModel(model),
              },
              {
                label: t("HomeTab.sections.models.actions.delete"),
                icon: "delete",
                variant: "danger",
                onClick: deleteModel(model),
              },
            ]}
            img={model.capture}
            zoom={2}
            key={index}
            title={model.title}
          />
        ))}
        <HeroIconButton icon="add" variant="accent" />
      </Carousel>
    </SafeArea>
  );
});
