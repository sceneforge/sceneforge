import {
  AppLayout,
  IconEnum,
  Variant,
} from "@sceneforge/ui";
import { lazy } from "react";
import { useTranslation } from "react-i18next";

import { useApp, useShortcuts } from "../hooks";

const Tabs = lazy(() => import("./Tabs"));

const App = () => {
  useApp();

  const { t } = useTranslation("tabs");
  const { openAbout, openHome, openSettings } = useShortcuts();

  return (
    <AppLayout
      colorScheme="dark"
      topbar={{
        actionsEnd: [
          {
            icon: IconEnum.Home,
            kind: "icon",
            label: t("HomeTab.title"),
            onClick: () => void openHome(),
          },
          {
            icon: IconEnum.Info,
            kind: "icon",
            label: t("AboutTab.title"),
            onClick: () => void openAbout(),
          },
          {
            icon: IconEnum.Settings,
            kind: "icon",
            label: t("SettingsTab.title"),
            onClick: () => void openSettings(),
          },
        ],
        title: "Scene Forge",
        variant: Variant.Primary,
      }}
    >
      <Tabs />
    </AppLayout>
  );
};

export default App;
