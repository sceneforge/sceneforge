import { fileOpen } from "browser-fs-access";
import { useCallback, useState } from "react";
import { ImportModel } from "../ImportModel/ImportModel";
import { NavList, NavListItem } from "../NavList";
import { useTabPanel } from "../TabPanel/TabPanelProvider";
import { Topbar } from "../Topbar";

export const AppNav = () => {
  const [recentFiles, setRecentFiles] = useState<File[]>([]);
  const { newTab } = useTabPanel();

  const handleImportModel = useCallback(() => {
    fileOpen({
      description: 'Select a 3D model',
      mimeTypes: ['model/gltf-binary', 'model/gltf+json'],
      extensions: ['.glb', '.gltf'],
      multiple: false,
      excludeAcceptAllOption: true,
    }).then((file) => {
      setRecentFiles((prev) => [file, ...prev]);
      newTab({
        title: file.name,
        active: true,
        type: "model-editor",
        component: () => (<ImportModel file={file} />),
      })
    }).catch((err) => {
      console.error(err);
    });
  }, [newTab, setRecentFiles]);
  
  return (
    <Topbar title="SceneForge" subtitle="Create Easy 3D Structure for Web" topbarIconButtons={[
      { icon: "new-file", "aria-label": "New File", title: "New File"},
      { icon: "open-file", "aria-label": "Import Model", title: "Import Model", onClick: handleImportModel }
    ]}>
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
}