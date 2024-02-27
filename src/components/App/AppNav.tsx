import { fileOpen } from "browser-fs-access";
import { useCallback, useState } from "react";
import { ModelViewTab, SettingsTab, type ModelViewTabProps } from "../../tabs";
import type { IconButtonProps } from "../IconButton/IconButton";
import { NavList, NavListItem } from "../NavList";
import { useTabPanel } from "../TabPanel/TabPanelProvider";
import { Topbar } from "../Topbar";

export const AppNav = () => {
  const [recentFiles, setRecentFiles] = useState<File[]>([]);
  const { newTab, getTabByTitle, activateTab } = useTabPanel();

  const openSettingsPage = useCallback(() => {
    const tab = getTabByTitle("Settings");
    if (tab) {
      activateTab(tab)();
    } else {
      newTab({
        title: "Settings",
        active: true,
        type: "regular",
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
      newTab<ModelViewTabProps>({
        title: file.name,
        active: true,
        component: ModelViewTab,
        props: { gltf: file },
      });
    }).catch((err) => {
      console.error(err);
    });
  }, [newTab, setRecentFiles]);

  const iconButtonsStart: IconButtonProps[] = [
    {
      icon: "new-file",
      "aria-label": "New File",
      title: "New File"
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
      title="SceneForge"
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
