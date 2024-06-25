import {
  AppLayout,
  IconEnum,
  Variant,
} from "@sceneforge/ui";
import { useTranslation } from "react-i18next";

import { useShortcuts } from "../../shortcuts";
import { AppTabs } from "./AppTabs";

export const App = () => {
  const { t } = useTranslation("tabs");
  const { openSettings } = useShortcuts();

  return (
    <AppLayout
      topbar={{
        title: "Scene Forge",
        toolbarEnd: {
          actions: [
            {
              icon: IconEnum.Settings,
              label: t("SettingsTab.title"),
              onClick: () => openSettings,
              type: "icon",
            },
          ],
        },
        variant: Variant.Default,
      }}
    >
      <AppTabs />
    </AppLayout>
  );
};
