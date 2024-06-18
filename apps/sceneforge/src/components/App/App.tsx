import { AppLayout, Position, TabsController, Variant } from "@sceneforge/ui";

import { HomeTab, ModelViewTab } from "../../tabs";

export interface AppProps {
  languages?: readonly string[];
}

export const App = () => {
  return (
    <>
      <AppLayout
        topbar={{
          title: "Scene Forge",
          variant: Variant.Default,
        }}
      >
        <TabsController
          closeable
          initialContent={[
            {
              panel: { component: HomeTab },
              tab: { id: "home", label: "Home" },
            },
            {
              panel: { component: ModelViewTab },
              tab: { id: "model", label: "Model Viewer" },
            },
          ]}
          position={Position.Start}
          variant={Variant.Default}
        />
      </AppLayout>
    </>
  );
};
