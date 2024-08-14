import {
  AppLayout,
  IconEnum,
  Variant,
} from "@sceneforge/ui";
import { lazy } from "react";
import { useTranslation } from "react-i18next";

import { ShortcutName, useApp, useAppContext, useShortcuts } from "../../hooks";

const Tabs = lazy(() => import("./Tabs"));

const App = () => {
  useApp();
  const { name } = useAppContext();

  const { t } = useTranslation("tabs");
  const { open } = useShortcuts();

  return (
    <AppLayout
      colorScheme="dark"
      topbar={{
        actionsEnd: [
          {
            icon: IconEnum.Home,
            kind: "icon",
            label: t("HomeTab.title"),
            onClick: () => void open(ShortcutName.Home),
          },
          {
            icon: IconEnum.Info,
            kind: "icon",
            label: t("AboutTab.title"),
            onClick: () => void open(ShortcutName.About),
          },
          {
            icon: IconEnum.Settings,
            kind: "icon",
            label: t("SettingsTab.title"),
            onClick: () => void open(ShortcutName.Settings),
          },
        ],
        title: name,
        variant: Variant.Primary,
      }}
    >
      <Tabs />
    </AppLayout>
  );
};

export default App;
