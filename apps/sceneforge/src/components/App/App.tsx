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
  const { openAbout, openHome, openSettings } = useShortcuts();

  return (
    <AppLayout
      colorScheme="dark"
      topbar={{
        title: "Scene Forge",
        toolbarEnd: {
          actions: [
            {
              icon: IconEnum.Home,
              label: t("HomeTab.title"),
              onClick: () => void openHome(),
              type: "icon",
            },
            {
              icon: IconEnum.QuestionMark,
              label: t("AboutTab.title"),
              onClick: () => void openAbout(),
              type: "icon",
            },
            {
              icon: IconEnum.Settings,
              label: t("SettingsTab.title"),
              onClick: () => void openSettings(),
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
