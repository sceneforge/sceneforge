
import { useCallback } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Grid } from "../../components/Grid";
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

  return (
    <SafeArea>
      <section>
        <h2>Recent Models</h2>
        <Grid cols={5}>
          {recentModels.map((model, index) => (
            <Card key={index} title={model.title}>
              <Button onClick={openModel(model)}>Open</Button>
            </Card>
          ))}
        </Grid>
      </section>
    </SafeArea>
  );
});
