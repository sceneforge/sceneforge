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
              kind: "icon",
              label: t("HomeTab.title"),
              onClick: () => void openHome(),
            },
            {
              icon: IconEnum.QuestionMark,
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
        },
        variant: Variant.Default,
      }}
    >
      <AppTabs />
    </AppLayout>
  );
};
