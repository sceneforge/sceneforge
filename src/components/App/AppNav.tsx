import { fileOpen } from "browser-fs-access";
import { useCallback, useId } from "react";
import { useTabs } from "../../hooks/useTabs";
import { loadFile } from "../../lib/loadFile";
import { SettingsTab } from "../../tabs";
import type { IconButtonProps } from "../IconButton/IconButton";
import { usePanel } from "../Panel";
import { useTabPanel } from "../TabPanel";
import { Topbar } from "../Topbar";

export const AppNav = () => {
  const { appTitle } = usePanel();
  const { newTab, getTabByTitle, activateTab } = useTabPanel();
  const { newModelViewTab } = useTabs();
  const settingsTabId = useId();

  const openSettingsPage = useCallback(() => {
    const tab = getTabByTitle("Settings");
    if (tab) {
      activateTab(tab)();
    } else {
      newTab({
        id: settingsTabId,
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
    })
      .then(loadFile)
      .then(({ blob }) => {
        newModelViewTab({ title: "Imported Model", gltf: blob() });
      })
      .catch(console.error);
  }, [newModelViewTab]);

  const handleNewModel = useCallback(() => {
    newModelViewTab({ title: "New Model" });
  }, [newModelViewTab]);

  const actionsStart: IconButtonProps[] = [
    {
      icon: "add",
      label: "New File",
      onClick: handleNewModel,
    },
    {
      icon: "uploadFile",
      label: "Import Model",
      onClick: handleImportModel,
    },
  ];

  const actionsEnd: IconButtonProps[] = [
    {
      icon: "settings",
      label: "Settings",
      onClick: openSettingsPage,
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
