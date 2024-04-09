import { Dispatch, useCallback, useMemo } from "react";
import { PanelSheetHeader } from "../PanelSheet";
import { Mode } from "./mode";
import { Model } from "../../lib/isModel";
import { loadFile } from "../../lib/loadFile";
import { fileOpen } from "browser-fs-access";
import { useModelContext } from "../ModelContext";
import { Toolbar } from "../Toolbar";

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

  return (
    <PanelSheetHeader
      editable
      name="model-name"
      title={model?.title ?? "Untitled Model"}
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
