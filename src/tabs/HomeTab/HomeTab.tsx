
import { useCallback } from "react";
import { Card } from "../../components/Card";
import { Carousel } from "../../components/Carousel";
import { type ModelProps } from "../../components/ModelViewer/ModelViewer";
import { Tab } from "../../components/TabPanel";
import { useTabs } from "../../hooks/useTabs";
import { useRecentModels } from "./useRecentModels";
import { SafeArea } from "../../components/SafeArea";

export interface HomeTabProps {
  active?: boolean;
  title?: string;
}

export const HomeTab = Tab(({ active }: HomeTabProps) => {
  const { recentModels } = useRecentModels(active);
  const { newModelViewTab } = useTabs();

  const openModel = useCallback(
    (model: ModelProps) => {
      return () => {
        newModelViewTab(model);
      };
    },
    [newModelViewTab]
  );

  const deleteModel = useCallback((model: ModelProps) => {
    return () => {
      console.log("delete", model);
    };
  }, []);

  return (
    <SafeArea vertical>
      <Carousel title="Models">
        {recentModels.map((model, index) => (
          <Card
            variant="accent"
            actions={[
              {
                label: "Open",
                variant: "accent",
                onClick: openModel(model),
              },
              {
                label: "Delete",
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
      </Carousel>
    </SafeArea>
  );
});
