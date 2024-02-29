import { fileOpen } from "browser-fs-access";
import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { useTabs } from "../../hooks/useTabs";
import { SettingsTab } from "../../tabs";
import type { IconButtonProps } from "../IconButton/IconButton";
import { NavList, NavListItem } from "../NavList";
import { usePanel } from "../Panel";
import { useTabPanel } from "../TabPanel/TabPanelProvider";
import { Topbar } from "../Topbar";

export const AppNav = () => {
  const { appTitle } = usePanel();
  const [recentFiles, setRecentFiles] = useState<File[]>([]);
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
    fileOpen({
      description: "Select a 3D model",
      mimeTypes: ["model/gltf-binary", "model/gltf+json"],
      extensions: [".glb", ".gltf"],
      multiple: false,
      excludeAcceptAllOption: true,
    }).then((file) => {
      setRecentFiles((prev) => [file, ...prev]);
      newModelViewTab({ title: file.name, gltf: file });
    }).catch((err) => {
      console.error(err);
    });
  }, [setRecentFiles, newModelViewTab]);

  const handleNewModel = useCallback(() => {
    newModelViewTab({ title: "New Model" });
  }, [newModelViewTab]);

  const iconButtonsStart: IconButtonProps[] = [
    {
      icon: "new-file",
      "aria-label": "New File",
      title: "New File",
      onClick: handleNewModel
    },
    {
      icon: "import-file",
      "aria-label": "Import Model",
      title: "Import Model",
      onClick: handleImportModel
    }
  ];

  const iconButtonsEnd: IconButtonProps[] = [
    {
      icon: "settings",
      "aria-label": "Settings",
      title: "Settings",
      onClick: openSettingsPage
    }
  ];

  return (
    <Topbar
      iconButtonsEnd={iconButtonsEnd}
      iconButtonsStart={iconButtonsStart}
      subtitle="Create Easy 3D Structure for Web"
      title={appTitle ?? "SceneForge"}
    >
      <NavList>
        <NavListItem>Home</NavListItem>
        <NavListItem header="Recent Files">
          {recentFiles.map((file, index) => (
            <NavListItem key={index}>{file.name}</NavListItem>
          ))}
        </NavListItem>
      </NavList>
    </Topbar>
  );
};
