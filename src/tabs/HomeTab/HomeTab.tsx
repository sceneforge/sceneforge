
import { useCallback } from "react";
import { Card } from "../../components/Card";
import { Carousel } from "../../components/Carousel";
import { type ModelProps } from "../../components/ModelViewer/ModelViewer";
import { SafeArea } from "../../components/SafeArea";
import { Tab } from "../../components/TabPanel";
import { useTabs } from "../../hooks/useTabs";
import { useRecentModels } from "./useRecentModels";

export interface HomeTabProps {
  active?: boolean;
  title?: string;
}

export const HomeTab = Tab(({ active }: HomeTabProps) => {
  const { recentModels } = useRecentModels(active);
  const { newModelViewTab } = useTabs();

  const openModel = useCallback((model: ModelProps) => {
    return () => {
      newModelViewTab(model);
    };
  }, [newModelViewTab]);

  const deleteModel = useCallback((model: ModelProps) => {
    return () => {
      console.log("delete", model);
    };
  }, []);

  return (
    <SafeArea>
      <Carousel title="Recent Models">
        {recentModels.map((model, index) => (
          <Card
            actions={[
              {
                label: "Open",
                onClick: openModel(model),
              },
              {
                label: "Delete",
                icon: "delete",
                variant: "danger",
                onClick: deleteModel(model),
              }
            ]}
            img={model.capture}
            key={index}
            title={model.title}
          />
        ))}
      </Carousel>
    </SafeArea>
  );
});
