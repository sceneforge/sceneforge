import { fileOpen } from "browser-fs-access";
import { useCallback } from "react";
import { useTabs } from "../../hooks/useTabs";
import { loadFile } from "../../lib/loadFile";
import { SettingsTab } from "../../tabs";
import { usePanel } from "../Panel";
import { useTabPanel } from "../TabPanel";
import { Topbar } from "../Topbar";
import { type ActionProps } from "../Action";

export const AppNav = () => {
  const { appTitle } = usePanel();
  const { openTab, defaultTab } = useTabPanel();
  const { newModelViewTab, newMarkdownTab } = useTabs();

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

  const actionsStart: ActionProps[] = [
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
