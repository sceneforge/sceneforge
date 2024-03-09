import { fileOpen } from "browser-fs-access";
import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useTabs } from "../../hooks/useTabs";
import { loadFile } from "../../lib/loadFile";
import { SettingsTab } from "../../tabs";
import type { IconButtonProps } from "../IconButton/IconButton";
import { NavList, NavListItem } from "../NavList";
import { usePanel } from "../Panel";
import { useTabPanel } from "../TabPanel";
import { Topbar } from "../Topbar";

export const AppNav = () => {
  const { appTitle } = usePanel();
  const { newTab, getTabByTitle, activateTab } = useTabPanel();
  const { newModelViewTab } = useTabs();

  const openSettingsPage = useCallback(() => {
    const tab = getTabByTitle("Settings");
    if (tab) {
      activateTab(tab)();
    } else {
      newTab({
        id: uuid(),
        title: "Settings",
        active: true,
        component: SettingsTab,
      });
    }
  }, [activateTab, getTabByTitle, newTab]);

  const handleImportModel = useCallback(() => {
    console.log("Import Model");
    fileOpen({
      description: "Select a 3D model",
      mimeTypes: ["model/gltf-binary", "model/gltf+json"],
      extensions: [".glb", ".gltf"],
      multiple: false,
      excludeAcceptAllOption: true,
    }).then(loadFile).then(({ blob }) => {
      newModelViewTab({ title: "Imported Model", gltf: blob() });
    }).catch(console.error);
  }, [newModelViewTab]);

  const handleNewModel = useCallback(() => {
    newModelViewTab({ title: "New Model" });
  }, [newModelViewTab]);

  const iconButtonsStart: IconButtonProps[] = [
    {
      icon: "file",
      "aria-label": "New File",
      title: "New File",
      onClick: handleNewModel
    },
    {
      icon: "file-import",
      "aria-label": "Import Model",
      title: "Import Model",
      onClick: handleImportModel
    }
  ];

  const iconButtonsEnd: IconButtonProps[] = [
    {
      icon: "cog",
      "aria-label": "Settings",
      title: "Settings",
      onClick: openSettingsPage
    }
  ];

  return (
    <Topbar
      iconButtonsEnd={iconButtonsEnd}
      iconButtonsStart={iconButtonsStart}
      title={appTitle ?? "SceneForge"}
    >
      <NavList>
        <NavListItem>Home</NavListItem>
      </NavList>
    </Topbar>
  );
};
