import {
  AppLayout,
  Variant,
} from "@sceneforge/ui";

import type { Database } from "../../lib/Database";

import { AppProvider } from "./AppProvider";
import { AppTabs } from "./AppTabs";

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
        <AppTabs />
      </AppLayout>
    </AppProvider>
  );
};
