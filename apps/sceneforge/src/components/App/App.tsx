import {
  AppLayout,
  Position,
  TabsController,
  Variant,
} from "@sceneforge/ui";

import type { Database } from "../../lib/Database";

import {
  HomeTab,
  ModelViewTab,
} from "../../tabs";
import { AppProvider } from "./AppProvider";

export interface AppProps {
  languages?: readonly string[];
  userData?: Database<"UserData">;
}

export const App = ({ languages }: AppProps) => {
  return (
    <AppProvider languages={languages}>
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
    </AppProvider>
  );
};
