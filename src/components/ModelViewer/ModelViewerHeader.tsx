import { Dispatch, useCallback, useMemo } from "react";
import { PanelSheetHeader } from "../PanelSheet";
import { Mode } from "./mode";
import { Model } from "../../lib/isModel";
import { loadFile } from "../../lib/loadFile";
import { fileOpen } from "browser-fs-access";
import { useModelContext } from "../ModelContext";
import { Toolbar } from "../Toolbar";
import { useTabPanel } from "../TabPanel";

export type ModelViewerHeaderProps = {
  model?: Model;
  mode?: Mode;
  setMode?: Dispatch<Mode>;
};

const modeLabels = {
  [Mode.View]: "View Mode",
  [Mode.Edit]: "Edit Mode",
  [Mode.Material]: "Material Mode",
} as const;

export const ModelViewerHeader = ({
  model,
  mode = Mode.Edit,
  setMode,
}: ModelViewerHeaderProps) => {
  const { updateModel } = useModelContext();
  const { updateTabTitle, activeTab } = useTabPanel();
  const modeLabel = useMemo(() => modeLabels[mode], [mode]);

  const handleModeChange = useCallback(
    (newMode: Mode) => () => setMode?.(newMode),
    [setMode]
  );

  const handleImport = useCallback(() => {
    fileOpen({
      description: "Select a 3D model",
      mimeTypes: ["model/gltf-binary", "model/gltf+json"],
      extensions: [".glb", ".gltf"],
      multiple: false,
      excludeAcceptAllOption: true,
    })
      .then(loadFile)
      .then(({ blob }) => {
        if (model && model.id) {
          updateModel(model.id, { gltf: blob() });
        }
      });
  }, [model, updateModel]);

  const handleModelNameChange = useCallback(
    async (value: string) => {
      if (model && model.id) {
        try {
          await updateModel(model.id, { title: value });
          if (activeTab) {
            updateTabTitle(activeTab.id, value);
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
    [model, updateModel, activeTab, updateTabTitle]
  );

  return (
    <PanelSheetHeader
      editable={mode === Mode.Edit}
      name="model-name"
      title={model?.title ?? "Untitled Model"}
      onUpdate={handleModelNameChange}
    >
      <Toolbar
        icon="menu"
        contentVariant="default"
        items={[
          {
            type: "item",
            label: "Model",
            items: [
              {
                type: "item",
                label: "Import...",
                onClick: handleImport,
              },
            ],
          },
          {
            type: "item",
            label: modeLabel,
            items: [
              {
                type: "item",
                label: "View Mode",
                active: mode === Mode.View,
                onClick: handleModeChange(Mode.View),
              },
              {
                type: "item",
                label: "Edit Mode",
                active: mode === Mode.Edit,
                onClick: handleModeChange(Mode.Edit),
              },
              {
                type: "item",
                label: "Material Mode",
                active: mode === Mode.Material,
                onClick: handleModeChange(Mode.Material),
              },
            ],
          },
        ]}
      />
    </PanelSheetHeader>
  );
};
