import { v4 as uuid } from "uuid";
import { useCallback } from "react";
import { useTabs } from "../../hooks/useTabs";
import { SettingsTab } from "../../tabs";
import { usePanel } from "../Panel";
import { useTabPanel } from "../TabPanel";
import { Topbar } from "../Topbar";
import { type ActionProps } from "../Action";

export const AppNav = () => {
  const { appTitle } = usePanel();
  const { openTab, defaultTab } = useTabPanel();
  const { newModelViewTab, newMarkdownTab } = useTabs();

  const handleNewModel = useCallback(() => {
    newModelViewTab({ id: uuid(), title: "New Model" });
  }, [newModelViewTab]);

  const actionsStart: ActionProps[] = [
    {
      icon: "add",
      label: "New File",
      onClick: handleNewModel,
    },
  ];

  const actionsEnd: ActionProps[] = [
    {
      icon: "moreVert",
      label: "Menu",
      items: [
        {
          type: "item",
          label: "Home",
          onClick: openTab(defaultTab),
        },
        {
          type: "item",
          label: "About",
          onClick: () => {
            newMarkdownTab({
              id: "about",
              title: "About",
              file: "/docs/about.md",
            });
          },
        },
        {
          type: "item",
          label: "Settings",
          onClick: openTab({
            id: "settings",
            title: "Settings",
            active: true,
            component: SettingsTab,
          }),
        },
      ],
    },
  ];

  return (
    <Topbar
      actionsStart={actionsStart}
      actionsEnd={actionsEnd}
      title={appTitle ?? "SceneForge"}
    />
  );
};
